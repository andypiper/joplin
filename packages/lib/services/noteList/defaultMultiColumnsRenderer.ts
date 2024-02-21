import { _ } from '../../locale';
import CommandService from '../CommandService';
import { ItemFlow, ListRenderer, OnClickEvent } from '../plugins/api/noteListType';

const renderer: ListRenderer = {
	id: 'detailed',

	label: async () => _('Detailed'),

	flow: ItemFlow.TopToBottom,

	dependencies: [
		'note.todo_completed',
		'item.selected',
		'note.is_shared',
		'note.isWatched',
	],

	multiColumns: true,

	itemSize: {
		width: 0,
		height: 34,
	},

	itemCss: // css
		`	
		& {
			display: block;
		}

		> .row {
			display: flex;
			height: 100%;

			> .item {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding-left: 8px;
				overflow: hidden;
				opacity: 0.6;

				> .content {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}

			> .item[data-name="note.is_todo"],
			> .item[data-name="note.title"] {
				opacity: 1;
			}

			> .item > .content > .watchedicon {
				display: none;
				margin-right: 8px;
			}
		}

		> .row.-watched > .item[data-name="note.title"] > .content > .watchedicon {
			display: inline-block;
		}

		> .row.-selected {
			background-color: var(--joplin-selected-color);
		}

		> .row.-shared {
			color: var(--joplin-color-warn3);
		}

		> .row.-completed {
			opacity: 0.5;
		}
	`,

	onHeaderClick: async (event: OnClickEvent) => {
		const field = event.elementId === 'title' ? 'title' : 'user_updated_time';
		void CommandService.instance().execute('toggleNotesSortOrderField', field);
	},

	itemTemplate: // html
		`
			<div class="row {{#item.selected}}-selected{{/item.selected}} {{#note.is_shared}}-shared{{/note.is_shared}} {{#note.todo_completed}}-completed{{/note.todo_completed}} {{#note.isWatched}}-watched{{/note.isWatched}}">
				{{#cells}}
					<div data-name="{{name}}" class="item" style="{{{styleHtml}}}">
						<div class="content">
							<i class="watchedicon fa fa-share-square"></i>{{{contentHtml}}}
						</div>
					</div>
				{{/cells}}
			</div>
		`,

	itemValueTemplates: {
		'note.is_todo': // html
			`
			{{#note.is_todo}}
				<div class="checkbox">
					<input data-id="todo-checkbox" type="checkbox" {{#note.todo_completed}}checked="checked"{{/note.todo_completed}}>
				</div>
			{{/note.is_todo}}
		`,
	},

	onRenderNote: async (props: any) => {
		return {
			...props,
		};
	},
};

export default renderer;
