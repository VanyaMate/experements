import { memo } from 'react';
import { Button } from './components/buttons/Button/ui/Button';

export const App = memo(function App() {
    const firstVar = 1;
    const secondVar = 2;
    const longNameVariable = 3;

    return (
        <>
            <h1>App {firstVar} </h1>
            <Button
                text={`button ${secondVar}`}
                onClick={() => console.log(longNameVariable)}
            />
        </>
    );
});
