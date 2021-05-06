import axiosIntance from "../../helpers/axios";
import { messageConstants } from "./constants";

// startConversation
export const startConversation = (receiverId) => {
  return async (dispatch) => {
    dispatch({
      type: messageConstants.START_CONVERSATION_REQUEST,
    });

    await axiosIntance
      .post("/conversation/start-conversation", {
        receiverId: receiverId,
      })
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          dispatch({
            type: messageConstants.START_CONVERSATION_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: messageConstants.START_CONVERSATION_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: messageConstants.START_CONVERSATION_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// getConversation
export const getConversation = () => {
  return async (dispatch) => {
    dispatch({
      type: messageConstants.GET_CONVERSATIONS_REQUEST,
    });

    await axiosIntance
      .get(`/conversation/get`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: messageConstants.GET_CONVERSATIONS_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: messageConstants.GET_CONVERSATIONS_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: messageConstants.GET_CONVERSATIONS_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// newMessage
export const newMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({
      type: messageConstants.SEND_MESSAGE_REQUEST,
    });

    await axiosIntance
      .post("/message/new", messageData)
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;

          dispatch({
            type: messageConstants.SEND_MESSAGE_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: messageConstants.SEND_MESSAGE_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: messageConstants.SEND_MESSAGE_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// getMessages
export const getMessages = (conversationId) => {
  return async (dispatch) => {
    dispatch({
      type: messageConstants.GET_MESSAGES_REQUEST,
    });

    await axiosIntance
      .get(`/message/${conversationId}`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res.data;

          dispatch({
            type: messageConstants.GET_MESSAGES_SUCCESS,
            payload: { data: data },
          });
        } else {
          dispatch({
            type: messageConstants.GET_MESSAGES_FAILURE,
            payload: { error: res.data.error },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: messageConstants.GET_MESSAGES_FAILURE,
          payload: {
            error:
              typeof err.response?.data?.error !== "object"
                ? err.response?.data?.error
                : err.response?.data?.error?.message ||
                  err.message ||
                  "Some unexpected error ocuured. Try refreshing the page or contact developer if problem persists.",
          },
        });
      });
  };
};

// clearConversationState
export const clearConversationState = () => {
  return async (dispatch) => {
    dispatch({
      type: messageConstants.CLEAR_CONVERSATION_SUCCESS,
    });
  };
};

export const addSocketMessage = (newMessage, contextId) => {
  return async (dispatch) => {
    dispatch({
      type: messageConstants.ADD_SOCKET_MESSAGE_SUCCESS,
      payload: { data: newMessage, contextId: contextId },
    });
  };
};
