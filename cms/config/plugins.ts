// cms/config/plugins.ts
export default ({ env }) => ({
	upload: {
		config: {
			provider: "aws-s3",
			providerOptions: {
				accessKeyId: env("S3_ACCESS_KEY_ID"),
				secretAccessKey: env("S3_SECRET_ACCESS_KEY"),
				region: env("S3_REGION", "auto"), // для R2 можно 'auto'
				endpoint: env("S3_ENDPOINT"), // напр. https://<ACCOUNT_ID>.r2.cloudflarestorage.com
				s3ForcePathStyle: true, // для R2 = true
				params: { Bucket: env("S3_BUCKET") },
			},
			actionOptions: {
				upload: {},
				uploadStream: {},
				delete: {},
			},
		},
	},
});
