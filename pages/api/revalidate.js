
export default async function handler(req, res) {

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== "sadfsadfdsafdsafasdfsdafdsafsadfdsaf") {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate('/')
    await res.revalidate('/trending')
    await res.revalidate('/upcoming')
    await res.revalidate('/popular')
    await res.revalidate('/new_videos')
    await res.revalidate('/random')
    await res.revalidate('/search')
    await res.revalidate('/channels')




    // Categories from your JSON
    // await res.revalidate('/category/japanese');
    // await res.revalidate('/category/asian');
    // await res.revalidate('/category/hentai');
    // await res.revalidate('/category/creampie');
    // await res.revalidate('/category/massage');
    // await res.revalidate('/category/blowjob');
    // await res.revalidate('/category/babe');
    // await res.revalidate('/category/blonde');
    // await res.revalidate('/category/bondage');
    // await res.revalidate('/category/dp');
    // await res.revalidate('/category/cumshot');
    // await res.revalidate('/category/indian');
    // await res.revalidate('/category/small-tits');
    // await res.revalidate('/category/masturbation');
    // await res.revalidate('/category/gay');
    // await res.revalidate('/category/mature');
    // await res.revalidate('/category/cam');
    // await res.revalidate('/category/latina');
    // await res.revalidate('/category/amateur');
    // await res.revalidate('/category/lesbian');
    // await res.revalidate('/category/milf');
    // await res.revalidate('/category/compilation');
    // await res.revalidate('/category/ebony');
    // await res.revalidate('/category/solo');
    // await res.revalidate('/category/groupsex');
    // await res.revalidate('/category/redhead');
    // await res.revalidate('/category/pov');
    // await res.revalidate('/category/vr');
    // await res.revalidate('/category/striptease');
    // await res.revalidate('/category/interracial');
    // await res.revalidate('/category/deep-throat');
    // await res.revalidate('/category/fetish');
    // await res.revalidate('/category/threesome');
    // await res.revalidate('/category/teen');
    // await res.revalidate('/category/vintage');
    // await res.revalidate('/category/big ass');
    // await res.revalidate('/category/hardcore');
    // await res.revalidate('/category/squirt');
    // await res.revalidate('/category/shemale');
    // await res.revalidate('/category/anal');
    // await res.revalidate('/category/handjob');
    // await res.revalidate('/category/toy');
    // await res.revalidate('/category/bbw');
    // await res.revalidate('/category/big tits');
    // await res.revalidate('/category/brunette');
    // await res.revalidate('/category/big dick');
    // await res.revalidate('/category/desi sex');
    // await res.revalidate('/category/desi mms');
    // await res.revalidate('/category/devar bhabhi');
    // await res.revalidate('/category/indian aunty');
    // await res.revalidate('/category/desi blowjob');
    // await res.revalidate('/category/webseries');





    console.log('Re-Validating... Successfull');
    return res.json({ revalidated: true })
  } catch (error) {
    console.log(error);
    return res.status(500).send(error)
  }
}



