export class LocalStorageManager {

  private static instance: LocalStorageManager;
  private storage: Storage;

  private constructor() {
    this.storage = window.localStorage;
  }

  public static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  public set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  public get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  public remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  public clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  public hasKey(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }

  // Get all storage keys
  public getAllKeys(): string[] {
    return Object.keys(this.storage);
  }

  // Get storage usage information
  public getStorageInfo(): { used: number; total: number; percentage: number } {
    let totalSize = 0;
    const keys = this.getAllKeys();
    
    keys.forEach(key => {
      const value = this.storage.getItem(key);
      if (value) {
        totalSize += (key.length + value.length) * 2; // UTF-16 uses 2 bytes per character
      }
    });

    const quota = 5 * 1024 * 1024; // 5MB is a common localStorage limit
    return {
      used: totalSize,
      total: quota,
      percentage: (totalSize / quota) * 100
    };
  }

  // Handle storage events
  public onStorageChange(callback: (event: StorageEvent) => void): void {
    window.addEventListener('storage', callback);
  }

  // Remove storage event listener
  public offStorageChange(callback: (event: StorageEvent) => void): void {
    window.removeEventListener('storage', callback);
  }

  // Batch operations
  public batchSet(items: { key: string; value: any }[]): void {
    items.forEach(item => this.set(item.key, item.value));
  }

  public batchGet(keys: string[]): Record<string, any> {
    return keys.reduce((acc, key) => {
      acc[key] = this.get(key);
      return acc;
    }, {} as Record<string, any>);
  }

  public batchRemove(keys: string[]): void {
    keys.forEach(key => this.remove(key));
  }
}