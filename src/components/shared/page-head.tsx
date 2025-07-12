import { Helmet } from 'react-helmet-async';

export default function PageHead({ title = 'Quản trị Happy Kids' }) {
  return (
    <Helmet>
      <title> {title} </title>
    </Helmet>
  );
}
