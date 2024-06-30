import { createContext, useState, useEffect, useContext, ReactNode, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useCurrentUser } from "../../hooks/user";

interface ISocketContext {
	socket: Socket | null;
	onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = (): ISocketContext => {
	const context = useContext(SocketContext);
	if (context === undefined) {
		throw new Error("useSocketContext must be used within a SocketContextProvider");
	}
	return context;
};

const socketURL = import.meta.env.VITE_WS_URL as string;

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
	const socketRef = useRef<Socket | null>(null);

	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const { user, isLoading } = useCurrentUser();

	useEffect(() => {
		if (user && !isLoading) {
			const socket = io(socketURL, {
				query: {
					userId: user.id,
				},
			});
			socketRef.current = socket;

			socket.on("getOnlineUsers", (users: string[]) => {
				setOnlineUsers(users);
			});

			return () => {
				socket.close();
				socketRef.current = null;
			};
		} else if (!user && !isLoading) {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		}
	}, [user, isLoading]);

	return (
		<SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>{children}</SocketContext.Provider>
	);
};

export default SocketContextProvider;