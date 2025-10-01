export interface Post {
	id: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	featured_image?: string;
	published_at: string;
	author_id?: string;
	status: 'draft' | 'published';
	tags: string[];
	created_at: string;
	updated_at: string;
}

export interface Comment {
	id: string;
	post_id: string;
	author_name: string;
	author_email: string;
	content: string;
	status: 'pending' | 'approved' | 'spam';
	created_at: string;
}

export interface Tag {
	id: string;
	name: string;
	slug: string;
	created_at: string;
}

// Database types (for Supabase)
export interface Database {
	public: {
		Tables: {
			posts: {
				Row: Post;
				Insert: Omit<Post, 'id' | 'created_at' | 'updated_at'>;
				Update: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>;
			};
			comments: {
				Row: Comment;
				Insert: Omit<Comment, 'id' | 'created_at'>;
				Update: Partial<Omit<Comment, 'id' | 'created_at'>>;
			};
			tags: {
				Row: Tag;
				Insert: Omit<Tag, 'id' | 'created_at'>;
				Update: Partial<Omit<Tag, 'id' | 'created_at'>>;
			};
		};
	};
}
