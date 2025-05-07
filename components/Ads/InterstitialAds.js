// components/InterstitialAd.js
import Head from 'next/head';
import Script from 'next/script';

const InterstitialAds = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.css" />
            </Head>
            <Script
                src="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.js"
                strategy="afterInteractive"
                onLoad={() => {
                    InterstitialTsAd({
                        spot: "ee9ab24036174503b1debe6c3ccc7fdf",
                        extid: "{extid}",
                        cookieExpires: 1

                    });
                }}
            />
            <div id="interstitial-ad"></div>



            {/* Exoclick Interstitial ads  */}

            {/* <Script
                async
                type="application/javascript"
                src="https://a.pemsrv.com/ad-provider.js"
                strategy="afterInteractive" // Ensures the script runs after the page is interactive
            />
            <Script
                id="ad-provider-init"
                strategy="afterInteractive" // Ensures this script runs after the external script
            >
                {`
        (window.AdProvider = window.AdProvider || []).push({ "serve": {} });
      `}
            </Script>
            <ins className="eas6a97888e35" data-zoneid="5390762"></ins> */}

        </>
    );
};


export default InterstitialAds;
