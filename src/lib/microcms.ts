import { createClient } from 'microcms-js-sdk';

// NOTE: この環境変数は、実際のデプロイ環境（Vercelなど）やローカルの.envに設定する必要があります。
export const microcmsClient = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN || 'DUMMY_DOMAIN',
  apiKey: import.meta.env.MICROCMS_API_KEY || 'DUMMY_API_KEY',
});

// お品書きの型定義
export type Menu = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  nameEn?: string;
  photo?: {
    url: string;
    height: number;
    width: number;
  };
  featured: boolean;
  order: number;
};

// 店舗情報の型定義
export type Info = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  hours: string;
  holiday: string;
  note?: string;
};

// お品書き一覧を取得
export const getMenus = async (queries?: any) => {
  // APIキー未設定時はモックデータを返す（構築時のエラー回避用）
  if (import.meta.env.MICROCMS_SERVICE_DOMAIN === undefined) {
    console.warn("microCMSのAPIキーが設定されていません。ダミーデータを返します。");
    return {
      contents: [
        { id: "1", name: "のどぐろ塩焼き", nameEn: "GRILLED ROSY SEABASS", photo: { url: "/images/dish-01.jpg", width: 1000, height: 1000 }, featured: true, order: 1, createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
        { id: "2", name: "鯛のあらだき", nameEn: "SIMMERED SEA BREAM", photo: { url: "/images/dish-02.jpg", width: 1000, height: 1000 }, featured: true, order: 2, createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
        { id: "3", name: "土鍋ご飯　福島県産コシヒカリ", nameEn: "CLAY-POT RICE", photo: { url: "/images/dish-03.jpg", width: 1000, height: 1000 }, featured: true, order: 3, createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
        { id: "4", name: "新さんまの造り", featured: false, order: 4, createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
        { id: "5", name: "賀茂茄子の揚げ出し", featured: false, order: 5, createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
        { id: "6", name: "福島の地酒 各種", featured: false, order: 6, createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
      ],
    };
  }
  return await microcmsClient.getList<Menu>({ endpoint: 'menu', queries });
};

// 店舗情報を取得
export const getInfo = async (queries?: any) => {
  if (import.meta.env.MICROCMS_SERVICE_DOMAIN === undefined) {
    return {
      hours: "18:00 - 23:00（L.O. 料理21:00）",
      holiday: "",
      note: "",
      createdAt: "", updatedAt: "", publishedAt: "", revisedAt: ""
    };
  }
  return await microcmsClient.getObject<Info>({ endpoint: 'info', queries });
};
