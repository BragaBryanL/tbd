'use client'

import { useState } from 'react'

interface UserInfo {
  id: string
  username: string
  displayName: string
  avatar: string
  avatarDecoration?: string
  avatarDecorationAsset?: any
  bannerColor: string
  themeColor: string
  email?: string
  creationDate: string
  accountAge: string
  profileBackground: string
  publicFlags: number
  premiumType: number
}

export default function DiscordLookup() {
  const [userId, setUserId] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError('Please enter a Discord User ID')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()
      console.log('Frontend received data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user data')
      }

      setUserInfo(data)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen p-8" style={{backgroundColor: '#23272A'}}>
      <div className="max-w-6xl mx-auto">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#5865F2'}}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{color: 'white'}}>Discord Database System</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#43B581'}}></div>
                <span style={{color: '#99AAB5'}} className="text-sm">Admin Panel • User Management System</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="discord-card mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{color: 'white'}}>User Database Query</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#5865F2'}}></div>
                <span style={{color: '#99AAB5'}} className="text-sm">System Online</span>
              </div>
            </div>
            <p style={{color: '#99AAB5'}} className="text-sm mb-4">Enter Discord User ID to retrieve user profile data from the database</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label style={{color: '#99AAB5'}} className="text-sm mb-2 block">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Discord User ID (e.g., 1112367855728607262)..."
                className="discord-input w-full"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="discord-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Querying...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Execute Query
                  </div>
                )}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 rounded-lg border" style={{backgroundColor: 'rgba(240, 71, 71, 0.1)', borderColor: '#F04747'}}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{color: '#F04747'}} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span style={{color: '#F04747'}} className="text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Data */}
        {userInfo && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="discord-card">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold" style={{color: 'white'}}>User Profile Data</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#43B581'}}></div>
                    <span style={{color: '#99AAB5'}} className="text-sm">Data Retrieved</span>
                  </div>
                </div>
              </div>
              
              {/* Profile Section - Fixed positioning */}
              <div style={{ position: 'relative', width: 'calc(100% + 3rem)', height: '200px', border: '1px solid rgb(58, 58, 64)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem', marginLeft: '-1.5rem', marginRight: '-1.5rem' }}>
                {userInfo.profileBackground && (
                  <img 
                    src={userInfo.profileBackground} 
                    alt="User Banner" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                )}
                <div style={{ position: 'absolute', bottom: '16px', left: '24px', display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
                  <div style={{ position: 'relative', width: '96px', height: '96px' }}>
                    {/* Avatar Decoration Layer */}
                    {userInfo.avatarDecoration && (
                      <img 
                        src={userInfo.avatarDecoration} 
                        alt="Avatar Decoration" 
                        style={{ 
                          position: 'absolute', 
                          top: '0', 
                          left: '0', 
                          width: '96px', 
                          height: '96px', 
                          pointerEvents: 'none', 
                          zIndex: 10 
                        }} 
                      />
                    )}
                    {/* Avatar */}
                    <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: '4px solid rgb(35, 39, 42)', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={userInfo.avatar} 
                        alt={userInfo.displayName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo.id}`
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0 0 4px 0' }}>{userInfo.displayName}</h2>
                    <p style={{ fontSize: '16px', color: 'rgb(153, 170, 181)', margin: '0' }}>@{userInfo.username}</p>
                    {/* Debug: Show decoration data */}
                    {userInfo.avatarDecoration && (
                      <div style={{ fontSize: '10px', color: '#43B581', margin: '4px 0 0 0' }}>
                        <p>✓ Decoration Available</p>
                        <p style={{ wordBreak: 'break-all' }}>URL: {userInfo.avatarDecoration}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* User Information Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border" style={{backgroundColor: 'rgba(88, 101, 242, 0.1)', borderColor: 'rgba(88, 101, 242, 0.3)'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4" style={{color: '#5865F2'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span style={{color: '#5865F2'}} className="text-sm font-medium">User Identity</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">USER ID</p>
                        <p className="font-mono text-sm" style={{color: 'white'}}>{userInfo.id}</p>
                      </div>
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">USERNAME</p>
                        <p className="text-sm" style={{color: 'white'}}>{userInfo.username}</p>
                      </div>
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">DISPLAY NAME</p>
                        <p className="text-sm" style={{color: 'white'}}>{userInfo.displayName}</p>
                      </div>
                      {userInfo.avatarDecoration && (
                        <div>
                          <p style={{color: '#99AAB5'}} className="text-xs mb-1">AVATAR DECORATION</p>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#FAA61A'}}></div>
                            <span className="text-sm" style={{color: 'white'}}>Equipped</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border" style={{backgroundColor: 'rgba(67, 181, 129, 0.1)', borderColor: 'rgba(67, 181, 129, 0.3)'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4" style={{color: '#43B581'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span style={{color: '#43B581'}} className="text-sm font-medium">Account Details</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">CREATION DATE</p>
                        <p className="text-sm" style={{color: 'white'}}>{userInfo.creationDate}</p>
                      </div>
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">ACCOUNT AGE</p>
                        <p className="text-sm" style={{color: 'white'}}>{userInfo.accountAge}</p>
                      </div>
                      {userInfo.email && (
                        <div>
                          <p style={{color: '#99AAB5'}} className="text-xs mb-1">EMAIL ADDRESS</p>
                          <p className="text-sm font-mono" style={{color: 'white'}}>{userInfo.email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border" style={{backgroundColor: 'rgba(250, 166, 26, 0.1)', borderColor: 'rgba(250, 166, 26, 0.3)'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4" style={{color: '#FAA61A'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                      </svg>
                      <span style={{color: '#FAA61A'}} className="text-sm font-medium">Visual Settings</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">BANNER COLOR</p>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded border"
                            style={{ borderColor: 'rgba(153, 170, 181, 0.3)', backgroundColor: userInfo.bannerColor }}
                          ></div>
                          <p className="font-mono text-sm" style={{color: 'white'}}>{userInfo.bannerColor}</p>
                        </div>
                      </div>
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">THEME COLOR</p>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded border"
                            style={{ borderColor: 'rgba(153, 170, 181, 0.3)', backgroundColor: userInfo.themeColor }}
                          ></div>
                          <p className="font-mono text-sm" style={{color: 'white'}}>{userInfo.themeColor}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border" style={{backgroundColor: 'rgba(240, 71, 71, 0.1)', borderColor: 'rgba(240, 71, 71, 0.3)'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4" style={{color: '#F04747'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span style={{color: '#F04747'}} className="text-sm font-medium">Account Status</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">STATUS</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#F04747'}}></div>
                          <span className="text-sm" style={{color: 'white'}}>Under Review</span>
                        </div>
                      </div>
                      <div>
                        <p style={{color: '#99AAB5'}} className="text-xs mb-1">RISK LEVEL</p>
                        <div className="flex items-center gap-2">
                          <div className="px-2 py-1 rounded text-xs font-medium" style={{backgroundColor: 'rgba(240, 71, 71, 0.2)', color: '#F04747'}}>HIGH</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Logs & Violations */}
            <div className="discord-card" style={{borderLeft: '4px solid #F04747'}}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold" style={{color: 'white'}}>System Logs & Violations</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#F04747'}}></div>
                    <span style={{color: '#F04747'}} className="text-sm font-medium">Critical</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: '#F04747'}}></div>
                    <span style={{color: '#F04747'}} className="font-medium">Account Status: Temporary Suspended</span>
                  </div>
                  <p style={{color: '#99AAB5', marginBottom: '1rem'}}>
                    User account has been flagged for violations of Discord Terms of Service. Access to platform features may be restricted pending review.
                  </p>
                </div>

                <div>
                  <div className="mb-4">
                    <h4 className="font-medium mb-3" style={{color: 'white'}}>Active Violations (3)</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border" style={{backgroundColor: 'rgba(240, 71, 71, 0.1)', borderColor: 'rgba(240, 71, 71, 0.3)'}}>
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#F04747'}}></span>
                          <div>
                            <p className="text-sm font-medium" style={{color: 'white'}}>Impersonation</p>
                            <p className="text-xs" style={{color: '#99AAB5'}}>Severity: High • Reported: 2 days ago</p>
                          </div>
                        </div>
                        <div className="px-2 py-1 rounded text-xs font-medium" style={{backgroundColor: 'rgba(240, 71, 71, 0.2)', color: '#F04747'}}>ACTIVE</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border" style={{backgroundColor: 'rgba(240, 71, 71, 0.1)', borderColor: 'rgba(240, 71, 71, 0.3)'}}>
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#F04747'}}></span>
                          <div>
                            <p className="text-sm font-medium" style={{color: 'white'}}>Child Endangerment</p>
                            <p className="text-xs" style={{color: '#99AAB5'}}>Severity: Critical • Reported: 5 days ago</p>
                          </div>
                        </div>
                        <div className="px-2 py-1 rounded text-xs font-medium" style={{backgroundColor: 'rgba(240, 71, 71, 0.2)', color: '#F04747'}}>ACTIVE</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border" style={{backgroundColor: 'rgba(240, 71, 71, 0.1)', borderColor: 'rgba(240, 71, 71, 0.3)'}}>
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#F04747'}}></span>
                          <div>
                            <p className="text-sm font-medium" style={{color: 'white'}}>Financial Scam</p>
                            <p className="text-xs" style={{color: '#99AAB5'}}>Severity: High • Reported: 1 week ago</p>
                          </div>
                        </div>
                        <div className="px-2 py-1 rounded text-xs font-medium" style={{backgroundColor: 'rgba(240, 71, 71, 0.2)', color: '#F04747'}}>ACTIVE</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border" style={{backgroundColor: 'rgba(240, 71, 71, 0.1)', borderColor: 'rgba(240, 71, 71, 0.3)'}}>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4" style={{color: '#F04747'}} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.09A1.65 1.65 0 008 4.65a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H12a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001.51 1H18a2 2 0 012 2v2a1.65 1.65 0 00-1 1.51V9a1.65 1.65 0 001.51 1H18a2 2 0 012 2v2a1.65 1.65 0 00-1 1.51V16a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51H12a1.65 1.65 0 00-1 1.51V16a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51H6a2 2 0 01-2-2v-2a1.65 1.65 0 001-1.51V11a1.65 1.65 0 00-1-1.51V8a2 2 0 012-2z" clipRule="evenodd" />
                    </svg>
                    <span style={{color: '#F04747'}} className="text-sm font-medium">Case Reports</span>
                  </div>
                  <div>
                    <p style={{color: '#99AAB5'}} className="text-xs mb-1">REPORTED BY USERS</p>
                    <p className="text-sm font-medium" style={{color: 'white'}}>23 different users has filed a case with this user</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border" style={{backgroundColor: 'rgba(88, 101, 242, 0.1)', borderColor: 'rgba(88, 101, 242, 0.3)'}}>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4" style={{color: '#5865F2'}} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <span style={{color: '#5865F2'}} className="text-sm font-medium">Financial Information</span>
                  </div>
                  <div>
                    <p style={{color: '#99AAB5'}} className="text-xs mb-1">WALLET ADDRESS</p>
                    <p className="font-mono text-sm" style={{color: 'white'}}>1PtMqhdbJAVYXXAY96EFjcHwVbusz1pmb</p>
                  </div>
                </div>

                {/* Random Profiles Section */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3" style={{color: 'white'}}>Related Profiles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg border" style={{backgroundColor: 'rgba(58, 58, 64, 0.3)', borderColor: 'rgba(88, 101, 242, 0.2)'}}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src="/hwa.laziaa-avatar.png" 
                            alt="Random User 1"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{color: 'white'}}>cwpcakepaws ♰</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#F04747'}}></div>
                        <span className="text-xs" style={{color: '#F04747'}}>High Risk</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border" style={{backgroundColor: 'rgba(58, 58, 64, 0.3)', borderColor: 'rgba(88, 101, 242, 0.2)'}}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src="/nhatphong-avatar.png" 
                            alt="Random User 2"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{color: 'white'}}>Maksha次 JR</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#FAA61A'}}></div>
                        <span className="text-xs" style={{color: '#FAA61A'}}>Medium Risk</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border" style={{backgroundColor: 'rgba(58, 58, 64, 0.3)', borderColor: 'rgba(88, 101, 242, 0.2)'}}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src="/toboyushime-avatar.png" 
                            alt="Random User 3"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{color: 'white'}}>TsumyVeil</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#43B581'}}></div>
                        <span className="text-xs" style={{color: '#43B581'}}>Low Risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
