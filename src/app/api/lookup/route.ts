import { NextRequest, NextResponse } from 'next/server'

const DISCORD_API_BASE = 'https://discord.com/api/v10'

function calculateAccountAge(userId: string): string {
  // Discord timestamp calculation
  const creationTimestamp = parseInt(userId) / 4194304 + 1420070400000
  const creationDate = new Date(creationTimestamp)
  const now = new Date()
  
  // Calculate total difference in milliseconds
  const diffMs = now.getTime() - creationDate.getTime()
  
  // Prevent negative values
  if (diffMs < 0) {
    return 'Calculating...'
  }
  
  // Calculate each unit
  const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000))
  const months = Math.floor((diffMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000))
  const days = Math.floor((diffMs % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000))
  
  let ageString = ''
  
  if (years > 0) {
    ageString += `${years} year${years !== 1 ? 's' : ''} `
  }
  if (months > 0) {
    ageString += `${months} month${months !== 1 ? 's' : ''} `
  }
  if (days > 0) {
    ageString += `${days} day${days !== 1 ? 's' : ''} `
  }
  if (hours > 0) {
    ageString += `${hours} hour${hours !== 1 ? 's' : ''} `
  }
  if (minutes > 0) {
    ageString += `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }
  
  return ageString.trim() || 'Less than 1 minute'
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const botToken = process.env.DISCORD_BOT_TOKEN

    if (!botToken) {
      return NextResponse.json({ error: 'Discord bot token not configured' }, { status: 500 })
    }

    // Fetch user data from Discord API
    const userResponse = await fetch(`${DISCORD_API_BASE}/users/${userId}`, {
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      } else if (userResponse.status === 401) {
        return NextResponse.json({ error: 'Invalid bot token' }, { status: 401 })
      } else {
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: userResponse.status })
      }
    }

    const userData = await userResponse.json()

    // Debug logging
    console.log('Discord API Response:', userData)
    console.log('Color fields:', {
      banner_color: userData.banner_color,
      theme_color: userData.theme_color,
      accent_color: userData.accent_color,
      bannerColor: userData.bannerColor,
      themeColor: userData.themeColor
    })

    // Format the response data
    const formattedData = {
      id: userData.id,
      username: userData.username,
      displayName: userData.global_name || userData.username,
      avatar: userData.avatar 
        ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=1024`
        : `https://cdn.discordapp.com/embed/avatars/${userData.discriminator % 5}.png`,
      avatarDecoration: userData.avatar_decoration 
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${userData.avatar_decoration}.png?size=1024`
        : null,
      bannerColor: userData.banner_color ? `#${userData.banner_color.toString(16).padStart(6, '0')}` : (userData.accent_color ? `#${userData.accent_color.toString(16).padStart(6, '0')}` : '#5865F2'),
      themeColor: userData.theme_color ? `#${userData.theme_color.toString(16).padStart(6, '0')}` : (userData.accent_color ? `#${userData.accent_color.toString(16).padStart(6, '0')}` : '#5865F2'),
      email: userData.email || null,
      creationDate: new Date(parseInt(userData.id) / 4194304 + 1420070400000).toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit' 
}),
      accountAge: calculateAccountAge(userData.id),
      profileBackground: userData.banner 
        ? `https://cdn.discordapp.com/banners/${userData.id}/${userData.banner}.png?size=2048`
        : null,
      avatarDecorationAsset: userData.avatar_decoration_data || null,
      publicFlags: userData.public_flags || 0,
      premiumType: userData.premium_type || 0,
    }

    return NextResponse.json(formattedData)

  } catch (error) {
    console.error('Discord API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
