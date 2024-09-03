export default {
	app: {
		name: "vms",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "b390e345d53f0e275aef451e9f208a8a",
		language: "french",
		publicDir: "assets",
	},
	auth: {
		userTokenSecret: "868e440A-1ax%W@b0c9fYY6Q!!0-664e1ce1118a17a20d0f",
		apiTokenSecret: "0e0f3198$Xax%W!c8b029B#Q-!073e4b4017541fbc018a74",
		jwtDuration: 60, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"vehiculemanagement",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "",
		port: "",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"",
		password: "",
		senderemail:"",
		sendername:"",
		host: "",
		secure: true,
		port: ""
	},
	upload: {
		tempDir: "uploads/temp/",
		import_data: {
			filenameType: "timestamp",
			extensions: "json,csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
		photo: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/photos/carburant",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		document: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "30",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files/carburant",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		image: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
}