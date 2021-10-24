declare module 'mongoose-fuzzy-searching' {
	import {Document, Query, FilterQuery, Model, Schema} from 'mongoose';

	export interface MongooseFuzzyOptions<T> {
		fields: (T extends Object ? keyof T : string)[];
	}

	export type Search =
		| string
		| {
				query: string;
				minSize?: number;
				prefixOnly?: boolean;
				exactOnly?: boolean;
		  };

	type Callback<T, QueryHelpers> = (
		err: any,
		data: Model<T, QueryHelpers>[],
	) => void;

	export interface MongooseFuzzyModel<T extends Document, QueryHelpers = {}>
		extends Model<T, QueryHelpers> {
		fuzzySearch(
			query: Search,
			additionalQuery?: FilterQuery<T>,
			callback?: Callback<T, QueryHelpers>,
		): Query<T[], T, QueryHelpers>;
		fuzzySearch(
			query: Search,
			callback?: Callback<T, QueryHelpers>,
		): Query<T[], T, QueryHelpers>;
	}

	function fuzzyPlugin<T>(
		schema: Schema<T>,
		options: MongooseFuzzyOptions<T>,
	): void;

	export default fuzzyPlugin;
}
