import { createUploadLink } from 'apollo-upload-client';
import { API_URL } from '../../env';

const uploadLink = createUploadLink({
  uri: API_URL,
  credentials: 'same-origin',
});

export default uploadLink;
