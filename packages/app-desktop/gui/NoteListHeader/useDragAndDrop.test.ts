import { NoteListColumns } from '@joplin/lib/services/plugins/api/noteListType';
import { dropHeaderAt } from './useDragAndDrop';

const defaultColumns: NoteListColumns = [
	{
		name: 'note.todo_completed',
		title: ' ',
		width: 40,
	},
	{
		name: 'note.user_updated_time',
		title: 'Updated',
		width: 100,
	},
	{
		name: 'note.title',
		title: 'Title',
		width: 0,
	},
];

describe('useDragAndDrop', () => {

	test.each([
		[
			defaultColumns,
			{
				name: 'note.title',
			},
			{
				columnName: 'note.todo_completed',
				location: 'before',
			},
			[
				'note.title',
				'note.todo_completed',
				'note.user_updated_time',
			],
		],
		[
			defaultColumns,
			{
				name: 'note.title',
			},
			{
				columnName: 'note.user_updated_time',
				location: 'before',
			},
			[
				'note.todo_completed',
				'note.title',
				'note.user_updated_time',
			],
		],
		[
			defaultColumns,
			{
				name: 'note.title',
			},
			{
				columnName: 'note.user_updated_time',
				location: 'after',
			},
			[
				'note.todo_completed',
				'note.user_updated_time',
				'note.title',
			],
		],
	])('should drop columns', (columns, header, insertAt, expected) => {
		const actual = dropHeaderAt(columns, header, insertAt as any).map(c => c.name);
		expect(actual).toEqual(expected);
	});

});
