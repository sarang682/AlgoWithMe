import { createBrowserRouter } from 'react-router-dom'
import Landing from '@/pages/Landing'
import MainLayout from '@/layouts/Main'
import Main from '@/pages/Main'
import Loading from "@/pages/Loading";
import Editor from "@/pages/Editor";
import Study from "@/pages/Study";
import StudyLayout from "@/layouts/Study";
import Invitation from "@/pages/Invitation";
import Docs from "@/pages/Docs.tsx";

const router = createBrowserRouter([
    {
        path: "/welcome",
        element: <Landing />
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'main', element: <Main /> },
            { path: ':groupId', element: <StudyLayout />,
                children: [
                    { path: 'docs/:pageId', element: <Docs /> },
                    { path: 'editor/:problemId', element: <Editor /> },
                    { path: 'study', element: <Study /> }
                ]
            }
        ]
    },
    {
        path: '/main',
        element: <Main />
    },
    {
        path: '/loading',
        element: <Loading />
    },
    {
        path: ':groupId',
        element: <StudyLayout />,
        children: [
            {
                path: 'editor/:problemId',
                element: <Editor />
            }
        ]
    },
    {
        path: '/:groupId/study',
        element: <Study />
    },
    {
        path: '/invitation/:groupId',
        element: <Invitation />
    },
])

export default router
