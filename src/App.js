import { useReducer } from 'react';
import './App.css';

const initialState = {
    username: '',
    password: '',
    loggedIn: false,
    error: ''
};

const logInReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };

        case 'LOGIN':
            try {
                if (action.payload.username === 'jerry' && action.payload.password === 'tom') {
                    return {
                        ...state,
                        loggedIn: true,
                        username: action.payload.username,
                        error: ''
                    };
                } else {
                    throw Error('Incorrect Password');
                }
            } catch (error) {
                return {
                    ...state,
                    loggedIn: false,
                    error: 'Incorrect Password'
                };
            }

        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false,
                username: '',
                password: '',
                error: ''
            };

        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(logInReducer, initialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'INPUT_CHANGE', payload: { name, value } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN', payload: { username: state.username, password: state.password } });
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <>
            <h1 className="text-center text-3xl font-semibold mt-3">Login with useReducer</h1>
            <div>
                {state.loggedIn ? (
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-center text-3xl mt-4 py-2">Welcome {state.username}</h2>
                        <button className="bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <form className="flex flex-col items-center justitify-center gap-4 mt-4 py-2" onSubmit={handleSubmit}>
                        <input className="border rounded-lg px-2 py-1" type="text" autoComplete="username" placeholder="Username" name="username" value={state.username} onChange={handleInputChange} />
                        <input
                            className="border rounded-lg px-2 py-1"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Password"
                            name="password"
                            value={state.password}
                            onChange={handleInputChange}
                        />
                        <button className="bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3" type="submit">
                            Login
                        </button>
                        <p className="text-red-500 text-center ">{state.error}</p>
                    </form>
                )}
            </div>
        </>
    );
}

export default App;
