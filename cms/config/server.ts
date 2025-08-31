// cms/config/server.ts
export default ({ env }) => ({
  url: env('https://bashir-dental.ru'),     // например, https://cms.башир-домен.ru
  proxy: true,
  app: { keys: env.array('APP_KEYS') },
});