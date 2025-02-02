exports.handler = async (event) => {
  const cashtag = event.path.split('/').pop();

  if (!cashtag) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Cashtag is required' }),
    };
  }

  try {
  
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`https://api.scraperapi.com?api_key=9e579748fb6e7d72e6072c0bf69c0b92&url=https://cash.app/${cashtag}`);
    const html = await response.text();

    const profileDataMatch = html.match(/var profile = ({.*?});/);

    if (!profileDataMatch) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Profile data not found' }),
      };
    }

    const profileData = JSON.parse(profileDataMatch[1]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        display_name: profileData.display_name,
        formatted_cashtag: profileData.formatted_cashtag,
        is_verified_account: profileData.is_verified_account,
        rate_plan: profileData.rate_plan,
        payment_button_type: profileData.payment_button_type,
        country_code: profileData.country_code,
        avatar: {
          image_url: profileData.avatar.image_url,
          initial: profileData.display_name.charAt(0).toUpperCase(),
          accent_color: '#00D64F'
        }
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }