import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { IBill } from "..";
import styles from "@/Home.module.css";
import { useEffect, useState } from "react";
import { getDetails } from "@/api";
import { URLSearchParams } from "url";

interface IAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
}

interface IDetail {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
  city: string;
  state: string;
  country: string;
  bio: string;
  about: string;
  financialAssets: IAsset[];
}

interface ID {
  id: string;
}

export default function Person() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery<IDetail>(["details", 2], () => getDetails(id + ""));
  console.log(data);

  return (
    <div>
      <div className={styles.smallWrapper}>
        <div style={{ marginBottom: 5, objectFit: "cover" }}>
          {router.query.picture ? <img src={router.query.picture + ""} /> : ""}
        </div>

        <div className={styles.smallInfo}>
          <span className={styles.assetTitle}>{router.query.name}</span>
          <span>Networth: $ {router.query.netWorth} Billion</span>
          <span>Industry: {router.query.industry}</span>
          <span>Country: {data?.country}</span>
          <span>State: {data?.state}</span>
          <span>City: {data?.city}</span>
          <p>About: {data?.bio}</p>
        </div>

        <div>
          <span className={styles.assetTitle}>Financial Assets</span>
          <div className={styles.assetWrapper}>
            {data?.financialAssets.map((info) => (
              <div key={info.companyName} className={styles.asset}>
                <span>Company: {info.companyName}</span>
                <span>Ticker: {info.ticker}</span>
                <span>
                  Shares: {Math.ceil(info.numberOfShares / 1000).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function useParams(): { id: any } {
  throw new Error("Function not implemented.");
}
