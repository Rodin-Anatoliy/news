import { model, Schema, Document } from 'mongoose';
import { INewsSearchResults } from '@interfaces/newsSearchResults.interface';

const newsSearchResultsShema: Schema = new Schema({
  query: { type: Schema.Types.String },
  createdAt: { type: Schema.Types.String },
  articles: {
    type: Schema.Types.Array,
  },
});

const newsSearchResultsModel = model<INewsSearchResults & Document>(
  'NewsSearchResults',
  newsSearchResultsShema,
);

export default newsSearchResultsModel;
