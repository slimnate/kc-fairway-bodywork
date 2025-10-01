<script lang="ts">
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import Placeholder from '@tiptap/extension-placeholder';

	let editor: Editor | null = $state(null);
	let editorElement: HTMLElement;

	// Button states
	let isBold = $state(false);
	let isItalic = $state(false);
	let isUnderline = $state(false);
	let isStrikethrough = $state(false);

	let isHeading1 = $state(false);
	let isHeading2 = $state(false);
	let isHeading3 = $state(false);

	let isBulletList = $state(false);
	let isOrderedList = $state(false);

	let isBlockquote = $state(false);
	let isHorizontalRule = $state(false);
	let isLink = $state(false);

	let htmlInput = $state('');

	function applyHtml() {
		if (!editor) return;
		editor.commands.setContent(htmlInput, true); // true => emit onUpdate
	}

	// Initialize TipTap editor
	onMount(() => {
		tick().then(() => {
			if (editorElement) {
				editor = new Editor({
					element: editorElement,
					extensions: [
						StarterKit.configure({
							link: {
								openOnClick: false
							}
						}),
						Image,
						Placeholder.configure({
							placeholder: 'Write your post content here...'
						})
					],
					content: content || '',
					onUpdate: ({ editor }) => {
						isBold = editor.isActive('bold');
						isItalic = editor.isActive('italic');
						isUnderline = editor.isActive('underline');
						isStrikethrough = editor.isActive('strike');
						isHeading1 = editor.isActive('heading', { level: 1 });
						isHeading2 = editor.isActive('heading', { level: 2 });
						isHeading3 = editor.isActive('heading', { level: 3 });
						isBulletList = editor.isActive('bulletList');
						isOrderedList = editor.isActive('orderedList');
						isBlockquote = editor.isActive('blockquote');
						isHorizontalRule = editor.isActive('horizontalRule');
						isLink = editor.isActive('link');

						content = editor.getHTML();
					},
					onSelectionUpdate: ({ editor }) => {
						console.log('onSelectionUpdate');

						isBold = editor.isActive('bold');
						isItalic = editor.isActive('italic');
						isUnderline = editor.isActive('underline');
						isStrikethrough = editor.isActive('strike');
						isHeading1 = editor.isActive('heading', { level: 1 });
						isHeading2 = editor.isActive('heading', { level: 2 });
						isHeading3 = editor.isActive('heading', { level: 3 });
						isBulletList = editor.isActive('bulletList');
						isOrderedList = editor.isActive('orderedList');
						isBlockquote = editor.isActive('blockquote');
						isHorizontalRule = editor.isActive('horizontalRule');
						isLink = editor.isActive('link');
					}
				});
			}
		});

		return () => {
			editor?.destroy();
		};
	});

	let { content = $bindable('') } = $props();
</script>

<div class="border-base-300 rounded-lg border">
	<!-- Toolbar -->
	<div class="border-base-300 flex flex-wrap gap-2 border-b p-2">
		{console.log(editor?.$node)}

		<!-- Formatting buttons -->
		<div class="join">
			<div
				class="btn btn-sm btn-accent join-item btn-outline border-accent/70 text-accent/70 pointer-events-none"
			>
				Format
			</div>
			<div class="tooltip tooltip-accent" data-tip="Bold">
				<button
					type="button"
					aria-label="Bold"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isBold}
					onclick={() => {
						console.log(editor?.$doc);

						editor?.chain().focus().toggleBold().run();
					}}
				>
					<strong>B</strong>
				</button>
			</div>
			<div class="tooltip tooltip-accent" data-tip="Italic">
				<button
					type="button"
					aria-label="Italic"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isItalic}
					onclick={() => editor?.chain().focus().toggleItalic().run()}
				>
					<em>I</em>
				</button>
			</div>
			<div class="tooltip tooltip-accent" data-tip="Underline">
				<button
					type="button"
					aria-label="Underline"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isUnderline}
					onclick={() => editor?.chain().focus().toggleUnderline().run()}
				>
					<u class="underline">U</u>
				</button>
			</div>
			<div class="tooltip tooltip-accent" data-tip="Strikethrough">
				<button
					type="button"
					aria-label="Strikethrough"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isStrikethrough}
					onclick={() => editor?.chain().focus().toggleStrike().run()}
				>
					<s>S</s>
				</button>
			</div>
		</div>

		<!-- Heading buttons -->
		<div class="join">
			<div
				class="btn btn-sm btn-accent join-item btn-outline border-accent/70 text-accent/70 pointer-events-none"
			>
				Heading
			</div>
			<div class="tooltip tooltip-accent" data-tip="Heading 1">
				<button
					type="button"
					aria-label="Heading 1"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isHeading1}
					onclick={() => {
						editor?.chain().focus().toggleHeading({ level: 1 }).run();
						// console.log(editor?.isActive('heading', { level: 1 }));
					}}
				>
					H1
				</button>
			</div>
			<div class="tooltip tooltip-accent" data-tip="Heading 2">
				<button
					type="button"
					aria-label="Heading 2"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isHeading2}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
				>
					H2
				</button>
			</div>
			<div class="tooltip tooltip-accent" data-tip="Heading 3">
				<button
					type="button"
					aria-label="Heading 3"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isHeading3}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
				>
					H3
				</button>
			</div>
		</div>

		<!-- List buttons -->
		<div class="join">
			<div
				class="btn btn-sm btn-accent join-item btn-outline border-accent/70 text-accent/70 pointer-events-none"
			>
				List
			</div>
			<div class="tooltip tooltip-accent" data-tip="Bullet List">
				<button
					type="button"
					aria-label="Bullet List"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isBulletList}
					onclick={() => editor?.chain().focus().toggleBulletList().run()}
				>
					•
				</button>
			</div>
			<div class="tooltip tooltip-accent" data-tip="Ordered List">
				<button
					type="button"
					aria-label="Ordered List"
					class="btn btn-sm btn-accent join-item"
					class:btn-outline={!isOrderedList}
					onclick={() => editor?.chain().focus().toggleOrderedList().run()}
				>
					1.
				</button>
			</div>
		</div>

		<!-- Blockquote button -->
		<div class="tooltip tooltip-accent" data-tip="Blockquote">
			<button
				type="button"
				aria-label="Blockquote"
				class="btn btn-sm btn-accent relative"
				class:btn-outline={!isBlockquote}
				onclick={() => editor?.chain().focus().toggleBlockquote().run()}
			>
				<span class="absolute top-1 text-2xl">&#x1F676;</span>&nbsp;&nbsp;
			</button>
		</div>
		<!-- Link button -->
		<div class="tooltip tooltip-accent" data-tip="Link">
			<button
				type="button"
				aria-label="Link"
				class="btn btn-sm btn-accent"
				class:btn-outline={!isLink}
				onclick={() => {
					const url = window.prompt('URL:');
					if (url) {
						editor?.chain().focus().toggleLink({ href: url }).run();
					}
				}}
			>
				<span class="icon icon-link icon-xs">&nbsp;</span>
			</button>
		</div>
		<!-- Horizontal Rule button -->
		<div class="tooltip tooltip-accent" data-tip="Horizontal Rule">
			<button
				type="button"
				aria-label="Horizontal Rule"
				class="btn btn-sm btn-accent"
				class:btn-outline={!isHorizontalRule}
				onclick={() => editor?.chain().focus().setHorizontalRule().run()}
			>
				---
			</button>
		</div>
	</div>

	<!-- Editor -->
	<div
		bind:this={editorElement}
		class="prose prose-headings:text-base-content prose-p:text-base-content prose-ul:text-base-content prose-ol:text-base-content prose-blockquote:text-base-content bg-base-200 prose-hr:border-base-content min-h-[400px] max-w-none p-4 text-left focus:outline-none"
	></div>

	<div class="mt-2 flex gap-2">
		<textarea
			class="textarea textarea-bordered flex-1"
			placeholder="Paste HTML here..."
			rows="4"
			bind:value={htmlInput}
		></textarea>
		<button type="button" class="btn btn-primary h-fit" onclick={applyHtml}> Apply HTML </button>
	</div>
</div>
