export const POSTS = [
	{
		_id: "1",
		text: "Exploring new coding techniques! 🔍",
		img: "/posts/postA.png",
		user: {
			username: "alexsmith",
			profileImg: "/avatars/user1.png",
			fullName: "Alex Smith",
		},
		comments: [
			{
				_id: "1",
				text: "Great insights!",
				user: {
					username: "emilyjones",
					profileImg: "/avatars/user1.png",
					fullName: "Emily Jones",
				},
			},
		],
		likes: ["abcd1234", "abcd1235", "abcd1236", "abcd1237"],
	},
	{
		_id: "2",
		text: "Anyone up for a coding challenge? 🚀",
		user: {
			username: "alexsmith",
			profileImg: "/avatars/user1.png",
			fullName: "Alex Smith",
		},
		comments: [
			{
				_id: "1",
				text: "Count me in!",
				user: {
					username: "emilyjones",
					profileImg: "/avatars/user1.png",
					fullName: "Emily Jones",
				},
			},
		],
		likes: ["abcd1234", "abcd1235", "abcd1236", "abcd1237"],
	},
	{
		_id: "3",
		text: "Just finished a new project with AI tools. 🤖",
		img: "/posts/postB.png",
		user: {
			username: "alexsmith",
			profileImg: "/avatars/user1.png",
			fullName: "Alex Smith",
		},
		comments: [],
		likes: ["abcd1234", "abcd1235", "abcd1236", "abcd1237", "abcd1238", "abcd1239"],
	},
	{
		_id: "4",
		text: "Learning Python this month. Any resources? 📚",
		img: "/posts/postC.png",
		user: {
			username: "alexsmith",
			profileImg: "/avatars/user1.png",
			fullName: "Alex Smith",
		},
		comments: [
			{
				_id: "1",
				text: "Try these tutorials!",
				user: {
					username: "emilyjones",
					profileImg: "/avatars/user1.png",
					fullName: "Emily Jones",
				},
			},
		],
		likes: [
			"abcd1234",
			"abcd1235",
			"abcd1236",
			"abcd1237",
			"abcd1238",
			"abcd1239",
			"abcd1240",
			"abcd1241",
			"abcd1242",
		],
	},
];

export const USERS_FOR_RIGHT_PANEL = [
	{
		_id: "1",
		fullName: "Alex Smith",
		username: "alexsmith",
		profileImg: "/avatars/user1.png",
	},
	{
		_id: "2",
		fullName: "Emily Jones",
		username: "emilyjones",
		profileImg: "/avatars/user1.png",
	},
	{
		_id: "3",
		fullName: "Sam Brown",
		username: "sambrown",
		profileImg: "/avatars/user1.png",
	},
	{
		_id: "4",
		fullName: "Lily Adams",
		username: "lilyadams",
		profileImg: "/avatars/user1.png",
	},
];
