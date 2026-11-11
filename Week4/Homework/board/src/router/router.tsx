import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../components/Layout";
import LandingPage from "../pages/LandingPage";
import PostListPage from "../pages/PostListPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostCreatePage from "../pages/PostCreatePage";
import PostEditPage from "../pages/PostEditPage";
import { requireAuth } from "./requireAuth";

export const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    {
        element: <Layout />,
        children: [
            { path: "/posts", element: <PostListPage /> },
            { path: "/posts/new", element: <PostCreatePage />, loader: requireAuth },
            { path: "/posts/:postId", element: <PostDetailPage /> },
            { path: "/posts/:postId/edit", element: <PostEditPage />, loader: requireAuth },
        ],
    },

    { path: "*", element: <Navigate to="/posts" replace /> },
]);
