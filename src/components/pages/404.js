import ErrorMessage from '../errorMessage/errorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                }}
            >
                Page does not exist
            </p>
            <Link
                style={{
                    display: 'block',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    backgroundColor: '#9F0013',
                    width: '300px',
                    margin: '30px auto',
                }}
                class={'button button-main'}
                to="/"
            >
                Back to main page
            </Link>
        </div>
    );
};

export default Page404;
