import { Database, DatabaseAdapter } from '@nozbe/watermelondb';
import LokiJSAdapter, {
  LokiAdapterOptions,
} from '@nozbe/watermelondb/adapters/lokijs';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { SQLiteAdapterOptions } from '@nozbe/watermelondb/adapters/sqlite/type';
import { Platform } from 'react-native';

import migrations from './model/migrations';
import schema from './model/schema';
// import Post from './model/Post' // ⬅️ You'll import your Models here

const commonOptions: SQLiteAdapterOptions & LokiAdapterOptions = {
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  //   jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (err: unknown) => {
    console.error(err);
  },
};

// First, create the adapter to the underlying database:
const adapter = Platform.select<DatabaseAdapter>({
  android: new SQLiteAdapter({
    ...commonOptions,
  }),
  ios: new SQLiteAdapter({
    ...commonOptions,
  }),
  web: new LokiJSAdapter({
    ...commonOptions,
    useWebWorker: false,
    useIncrementalIndexedDB: true,
    // dbName: 'myapp', // optional db name

    // --- Optional, but recommended event handlers:

    onQuotaExceededError: error => {
      // Browser ran out of disk space -- offer the user to reload the app or log out
      console.error(error);
    },
    extraIncrementalIDBOptions: {
      onDidOverwrite: () => {
        // Called when this adapter is forced to overwrite contents of IndexedDB.
        // This happens if there's another open tab of the same app that's making changes.
        // Try to synchronize the app now, and if user is offline, alert them that if they close this
        // tab, some data may be lost
      },
      onversionchange: () => {
        // database was deleted in another browser tab (user logged out), so we must make sure we delete
        // it in this tab as well - usually best to just refresh the page
        // window.location.reload();
      },
    },
  }),
});

if (!adapter) throw new Error('Unknown Platform');
// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    // Post, // ⬅️ You'll add Models to Watermelon here
  ],
});

export default database;
