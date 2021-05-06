import { messageConstants } from "../actions/constants";

const initialState = {
  getConversationsData: [],
  getConversationsLoading: false,
  getConversationsSuccess: false,
  getConversationsError: null,
  // start new conversation
  startConversationData: null,
  startConversationLoading: false,
  startConversationSuccess: false,
  startConversationError: null,
  // get message by conversationId
  getMessagesByConvIdData: [],
  getMessagesByConvIdLoading: false,
  getMessagesByConvIdSuccess: false,
  getMessagesByConvIdError: null,
  // send new conversation
  sendMessageData: null,
  sendMessageLoading: false,
  sendMessageSuccess: false,
  sendMessageError: null,
};

// addMessage
const addMessage = (oldMessages, newMessage) => {
  let tempMessages = [...oldMessages];

  tempMessages.push(newMessage);

  return tempMessages;
};

// addSocketMessage
const addSocketMessage = (oldMessages, newMessage, contextId) => {
  let tempMessages = [...oldMessages];

  if (contextId && contextId === newMessage?.sender) {
    tempMessages.push(newMessage);
  }

  return tempMessages;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case messageConstants.GET_CONVERSATIONS_REQUEST:
      state = {
        ...state,
        getConversationsLoading: true,
        getConversationsError: null,
      };
      break;

    case messageConstants.GET_CONVERSATIONS_SUCCESS:
      state = {
        ...state,
        getConversationsData: action.payload.data,
        getConversationsLoading: false,
        getConversationsSuccess: true,
        getConversationsError: null,
      };
      break;

    case messageConstants.GET_CONVERSATIONS_FAILURE:
      state = {
        ...state,
        getConversationsData: [],
        getConversationsLoading: false,
        getConversationsSuccess: false,
        getConversationsError: action.payload.error,
      };
      break;

    case messageConstants.START_CONVERSATION_REQUEST:
      state = {
        ...state,
        startConversationLoading: true,
        startConversationError: null,
      };
      break;

    case messageConstants.START_CONVERSATION_SUCCESS:
      state = {
        ...state,
        startConversationData: action.payload.data,
        startConversationLoading: false,
        startConversationSuccess: true,
        startConversationError: null,
      };
      break;

    case messageConstants.START_CONVERSATION_FAILURE:
      state = {
        ...state,
        startConversationData: null,
        startConversationLoading: false,
        startConversationSuccess: false,
        startConversationError: action.payload.error,
      };
      break;

    case messageConstants.GET_MESSAGES_REQUEST:
      state = {
        ...state,
        getMessagesByConvIdLoading: true,
        getMessagesByConvIdError: null,
      };
      break;

    case messageConstants.GET_MESSAGES_SUCCESS:
      state = {
        ...state,
        getMessagesByConvIdData: action.payload.data,
        getMessagesByConvIdLoading: false,
        getMessagesByConvIdSuccess: true,
        getMessagesByConvIdError: null,
      };
      break;

    case messageConstants.GET_MESSAGES_FAILURE:
      state = {
        ...state,
        getMessagesByConvIdData: [],
        getMessagesByConvIdLoading: false,
        getMessagesByConvIdSuccess: false,
        getMessagesByConvIdError: action.payload.error,
      };
      break;

    case messageConstants.SEND_MESSAGE_REQUEST:
      state = {
        ...state,
        sendMessageLoading: true,
        sendMessageError: null,
      };
      break;

    case messageConstants.SEND_MESSAGE_SUCCESS:
      state = {
        ...state,
        sendMessageData: action.payload.data,
        getMessagesByConvIdData: addMessage(
          state.getMessagesByConvIdData,
          action.payload.data
        ),
        sendMessageLoading: false,
        sendMessageSuccess: true,
        sendMessageError: null,
      };
      break;

    case messageConstants.SEND_MESSAGE_FAILURE:
      state = {
        ...state,
        sendMessageData: null,
        sendMessageLoading: false,
        sendMessageSuccess: false,
        sendMessageError: action.payload.error,
      };
      break;

    case messageConstants.CLEAR_CONVERSATION_SUCCESS:
      state = {
        ...state,
        startConversationSuccess: false,
      };
      break;

    case messageConstants.ADD_SOCKET_MESSAGE_SUCCESS:
      state = {
        ...state,
        getMessagesByConvIdData: addSocketMessage(
          state.getMessagesByConvIdData,
          action.payload.data,
          action.payload.contextId
        ),
      };
      break;

    default:
      break;
  }

  return state;
};
