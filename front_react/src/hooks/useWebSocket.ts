import { Client, StompSubscription } from '@stomp/stompjs'
import { useDispatch, useSelector } from 'react-redux'
import {
  addMessage,
  initMessage,
  initMessageUpdateUserTab,
  setClient,
  setConnected,
  setMessageUpdateStudy,
  setMessageUpdateUserTab,
  subscribe,
  subscribeUser,
  unsubscribe,
  unsubscribeUser,
} from '@/features/socket/webSocketSlice'
import SockJS from 'sockjs-client'
import { RootState } from '@/lib/store'
import { useState } from 'react'

interface Message {
  language: string
  code: string
}

export function useWebSocket() {
  const dispatch = useDispatch()
  const client = useSelector((state: RootState) => state.socket.client)
  const [subscriptions, setSubscriptions] = useState<{
    [key: string]: StompSubscription
  }>({})
  const [userSubscriptions, setUserSubscriptions] = useState<{
    [key: string]: StompSubscription
  }>({})
  const [studySubscripton, setStudySubscription] = useState< StompSubscription>()
  const [studyTopic, setStudyTopic] = useState<string>()
  const baseUrl =
    import.meta.env.MODE === 'development'
      ? import.meta.env.VITE_API_DEV_URL
      : import.meta.env.VITE_API_URL

  const connectToServer = async (groupId: number) => {
    if (client !== null) {
  //    console.log('Already connected')
      // if (studySubscripton) {
      //
      //   studySubscripton.unsubscribe()
      //
      //   const subscription = client.subscribe(
      //     `/topic/study/${groupId}`,
      //     (message) => {
      //       console.log('Message received:', message.body)
      //       dispatch(setMessageUpdateStudy(message.body))
      //       // 메시지 처리 로직 혹은 저장 로직 추가
      //     },
      //   )
      //   setStudyTopic(`/topic/study/${groupId}`)
      //   setStudySubscription(subscription)
      // }
      return
    }
    const newClient = new Client({
      webSocketFactory: () => new SockJS(`${baseUrl}/algowithme-websocket`),
      onConnect: () => {
   //     console.log('Connection successful')
        dispatch(setConnected(true))

        const subscription = newClient.subscribe(
          `/topic/study/${groupId}`,
          (message) => {
   //         console.log('Message received:', message.body)
            dispatch(setMessageUpdateStudy(message.body))
            // 메시지 처리 로직 혹은 저장 로직 추가
          },
        )
   //     console.log(subscription)
        setStudySubscription(subscription)
      },
      onStompError: (frame) => {
   //     console.error(
   //       `Broker reported error: ${frame.headers.message}`,
   //       frame.body,
  //      )
      },
      debug: (str) => {
   //     console.log(`Debug: ${str}`)
      },
      reconnectDelay: 5000,
    })

    newClient.activate()
    dispatch(setClient(newClient))
  }

  const subscribeStudy = (topic : string) => {
    if (client && client.connected) {
      if(topic === studyTopic) return
      if(studySubscripton) {studySubscripton.unsubscribe()}
      const subscription = client.subscribe(topic, (message) => {
    //    console.log('Message received:', message.body)
        dispatch(setMessageUpdateStudy(message.body))
        // 메시지 처리 로직 혹은 저장 로직 추가
      })
      setStudySubscription(subscription)
    }
  }

  const disconnectToServer = () => {
    Object.values(subscriptions).forEach((sub) => sub.unsubscribe())
    setSubscriptions({})
    client?.deactivate()
  }

  const subscribeToTopic = (topic: string, isUserSubscription = false) => {
    if (client && client.connected) {
      const subscription = client.subscribe(topic, (message) => {
        const parsedMessage = JSON.parse(message.body)
        if (isUserSubscription) {

          dispatch(setMessageUpdateUserTab(parsedMessage))
        } else {
          dispatch(addMessage(parsedMessage))
        }
  //      console.log('Message received: ' + message.body)
      })
      if (isUserSubscription)
        setUserSubscriptions((subs) => ({ ...subs, [topic]: subscription }))
      else setSubscriptions((subs) => ({ ...subs, [topic]: subscription }))
      isUserSubscription
        ? dispatch(subscribeUser(topic))
        : dispatch(subscribe(topic))
    } else {
   //   console.error(
  //      'Attempted to subscribe while STOMP client is disconnected.',
  //    )
    }
  }

  const unsubscribeFromTopic = (topic: string, isUserSubscription = false) => {
    const subsType = isUserSubscription ? userSubscriptions : subscriptions
    const subscription = subsType[topic]
 //   console.log(subsType)
    if (subscription) {
      subscription.unsubscribe()
 //     console.log(`Unsubscribed from ${topic}`)
      const updateFunc = isUserSubscription
        ? setUserSubscriptions
        : setSubscriptions
      updateFunc((subs) => {
        const { [topic]: _, ...rest } = subs
        return rest
      })
      isUserSubscription ? dispatch(unsubscribeUser()) : dispatch(unsubscribe())
      dispatch(isUserSubscription ? initMessageUpdateUserTab() : initMessage())
    } else {
      console.error(`No subscription found for topic ${topic}`)
    }
  }

  const sendUpdateMessage = (
    destination: string,
    body: string,
    headers = {},
  ) => {
    if (client && client.connected) {
      const messageString = JSON.stringify(body)
      client.publish({ destination, body: messageString, headers })
    } else {
      console.error(
        'Attempted to send message while STOMP client is disconnected.',
      )
    }
  }

  const sendMessage = (destination: string, body: Message, headers = {}) => {
    if (client && client.connected) {
      const messageString = JSON.stringify(body)
      client.publish({ destination, body: messageString, headers })
    } else {
      console.error(
        'Attempted to send message while STOMP client is disconnected.',
      )
    }
  }

  return {
    disconnectToServer,
    connectToServer,
    subscribeToTopic,
    unsubscribeFromTopic,
    sendMessage,
    sendUpdateMessage,
    subscribeStudy,
  }
}
