import Script from "next/script";


function BannerAds() {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return (
        <div className="">

            <Script
                type="text/javascript"
                src="//cdn.tsyndicate.com/sdk/v1/bi.js"
                data-ts-spot="0f6bc55966ea4d7192101f480dd99643"
                data-ts-width="300"
                data-ts-height="250"
                data-ts-extid="{extid}"
                async
                defer
            />


            {/* Exoclick Multiformat  */}

            {/* <Script
                async
                type="application/javascript"
                src="https://a.magsrv.com/ad-provider.js"
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
            <ins className="eas6a97888e38" data-zoneid="5390772"></ins> */}




  


        </div>
    )
}

export default BannerAds;
