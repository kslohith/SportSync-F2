import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SportSync',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
