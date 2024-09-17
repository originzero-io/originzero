import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { verifyAccessToken } from "../middlewares/jwt.js";
import auth from "../../auth-module/auth.routes.js";

const router = express.Router();

router.use("/auth", auth);
// router.use(verifyAccessToken);

// router.use(
//   "/configuration",
//   createProxyMiddleware({
//     target: "http://localhost:5001",
//     changeOrigin: true,
//     secure: false,
//     ws: true,
//     onProxyReq: fixRequestBody,
//   })
// );
// router.use(
//   "/configuration_socket",
//   createProxyMiddleware({
//     target: "http://localhost:5001",
//     changeOrigin: true,
//     secure: false,
//     ws: true,
//     onProxyReq: fixRequestBody,
//   })
// );
// router.use(
//   "/flowExecutor_socket",
//   createProxyMiddleware({
//     target: "http://localhost:5002",
//     changeOrigin: true,
//     secure: false,
//     ws: true,
//     onProxyReq: fixRequestBody,
//   })
// );
// router.get("/flow-container/:port", flowContainerMiddleware);

// const testProxy = (req, res, next) => {
//   // const { port } = req.params;
//   // console.log(req.params);
//   // console.log("porttt: ", port);
//   createProxyMiddleware({
//     target: "http://localhost",
//     router: {
//       "/configuration": "http://localhost:5001",
//       "/configuration_socket": "http://localhost:5001",
//       "/flowExecutor_socket": "http://localhost:5002",
//     },

//     ws: true,
//     changeOrigin: true,
//     secure: false,
//     onProxyReq: fixRequestBody,
//   })(req, res, next);
// };

// router.use("**", testProxy);
// router.use("/flow-container/:port", flowContainerMiddleware);

// const flowContainerMiddleware = (req, res, next) => {
//   const { port } = req.params;
//   const targetUrl = `http://localhost:${port}`;
//   // Hedef URL'ye yönlendirme gerçekleştirin
//   createProxyMiddleware({ target: targetUrl })(req, res, next);
// };
// router.use(
//   ["/configuration", "/configuration_socket", "/flowExecutor_socket"],
//   createProxyMiddleware({
//     target: "http://localhost",
//     router: {
//       "/configuration": "http://localhost:5001",
//       "/configuration_socket": "http://localhost:5001",
//       "/flowExecutor_socket": "http://localhost:5002",
//     },
//     ws: true,
//     changeOrigin: true,
//     secure: false,
//     onProxyReq: fixRequestBody,
//   })
// );
// router.use(["/flow-container/:port"], (req, res, next) => {
//   const { port } = req.params;
//   const targetUrl = `http://localhost:${port}`;
//   createProxyMiddleware({
//     target: targetUrl,
//     ws: true,
//     changeOrigin: true,
//     secure: false,
//     onProxyReq: fixRequestBody,
//   })(req, res, next);
// });
router.use(
  "**",
  createProxyMiddleware({
    target: "http://localhost",
    router: {
      "/configuration": "http://localhost:5001",
      "/configuration_socket": "http://localhost:5001",
      "/flowExecutor_socket": "http://localhost:5002",
      "/dockerize": "http://localhost:6000",
    },
    ws: true,
    changeOrigin: true,
    secure: false,
    onProxyReq: fixRequestBody,
  })
);

export default router;
