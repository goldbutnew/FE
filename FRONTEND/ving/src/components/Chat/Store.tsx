import create from 'zustand';

interface Message {
  userName: string;
  nickname: string;
  timestamp: string;
  donation : number;
  isTts : Boolean;
  text: string;
}

const useChatStore = create(set => ({
  messages: [] as Message[],
  addMessage: (message: Message) => set(state => ({ messages: [...state.messages, message] }))
}));

export default useChatStore;
