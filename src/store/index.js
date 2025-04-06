import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import commonReducer from "./common/commonSlice";
import currentAppTokenReducer from "./currentAppToken/currentAppToken";
import categoryReducer from "./category/categorySlice";
import subCategoryReducer from "./category/subCategorySlice";
import packageReducer from "./package/packageSlice";
import bannerReducer from "./banner/BannerSlice";
import notificationReducer from "./notifications/notificationsSlice";
import notificationRealTimeReducer from "./notificationRealTime/notificationRealTimeSlice";
import customizationReducer from "./customize/customizationSlice";
import chatReducer from "./chat/chatSlice";
import productsReducer from "./products/productsSlice";
import HomeImageReducer from "./homePageImage/homePageImageSlice";
import ReferralReducer from "./referral/referralSlice";
import RefundReducer from "./refund/refundSlice";
import PaymentInquiryReducer from "./paymentInquiry/paymentInquirySlice";
import cartReducer from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
import orderReducer from "./order/orderSlice";
import addressReducer from "./address/addressSlice";

export const allReducers = combineReducers({
  common: commonReducer,
  auth: authReducer,
  appToken: currentAppTokenReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  package: packageReducer,
  banner: bannerReducer,
  notification: notificationReducer,
  notificationRealTime: notificationRealTimeReducer,
  chat: chatReducer,
  products: productsReducer,
  homeImage: HomeImageReducer,
  referral: ReferralReducer,
  refund: RefundReducer,
  paymentInquiry: PaymentInquiryReducer,
  customization: customizationReducer,
  cart: cartReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
  address: addressReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["common"],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
