import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import Bingo from './components/Bingo'

function App() {

	// Create a client
	const queryClient = new QueryClient()
	return (

		<QueryClientProvider client={queryClient}>

			<Bingo />

		</QueryClientProvider>

	)
}

export default App
