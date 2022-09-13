import { list } from "@keystone-6/core";
import {
	text,
	relationship,
	password,
	timestamp,
	select,
	multiselect,
	image,
	file,
} from "@keystone-6/core/fields";

import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";

// User Form
export const lists: Lists = {
	User: list({
		fields: {
			name: text({ validation: { isRequired: true } }),
			email: text({
				validation: { isRequired: true },
				isIndexed: "unique",
				isFilterable: true,
			}),
			password: password({ validation: { isRequired: true } }),
			posts: relationship({ ref: "Post.author", many: true }),
		},
		ui: {
			listView: {
				initialColumns: ["name", "posts"],
			},
		},
	}),
	// Landing Page Form
	LandingPage: list({
		fields: {
			title: text(),
			header: text(),
			visi: text(),
			misi: multiselect({
				options: [
					{ label: "Misi 1", value: "misi1" },
					{ label: "Misi 2", value: "misi2" },
				],
			}),
			avatar: image({ storage: "my_local_images" }),
			someFile: file({ storage: "my_s3_files" }),
			about: text(),
			portofolio: document({
				formatting: true,
			}),
		},
	}),
	// Product Firm
	Product: list({
		fields: {
			title: text(),
		},
	}),
	// Carrer Form Input
	Carrer: list({
		fields: {
			title: text(),
			about: document({
				formatting: true,
			}),
		},
	}),
	// Post Form
	Post: list({
		fields: {
			title: text(),
			status: select({
				options: [
					{ label: "Published", value: "published" },
					{ label: "Draft", value: "draft" },
				],
				defaultValue: "draft",
				ui: {
					displayMode: "segmented-control",
				},
			}),
			content: document({
				formatting: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
					[2, 1],
					[1, 2],
					[1, 2, 1],
				],
				links: true,
				dividers: true,
			}),
			publishDate: timestamp(),
			author: relationship({
				ref: "User.posts",
				ui: {
					displayMode: "cards",
					cardFields: ["name", "email"],
					inlineEdit: { fields: ["name", "email"] },
					linkToItem: true,
					inlineConnect: true,
				},
			}),
			tags: relationship({
				ref: "Tag.posts",
				ui: {
					displayMode: "cards",
					cardFields: ["name"],
					inlineEdit: { fields: ["name"] },
					linkToItem: true,
					inlineConnect: true,
					inlineCreate: { fields: ["name"] },
				},
				many: true,
			}),
		},
	}),

	// Tag Form
	Tag: list({
		ui: {
			isHidden: true,
		},
		fields: {
			name: text(),
			posts: relationship({ ref: "Post.tags", many: true }),
		},
	}),
};