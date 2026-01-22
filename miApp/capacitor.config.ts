import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.SaveAndServe.app',
  appName: 'miApp',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      'localhost',
      '10.0.2.2',
      '*.openstreetmap.org'
    ]
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
