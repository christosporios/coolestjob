import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        // Get title and company from the request
        const title = searchParams.get('title') || 'coolestjob.gr'
        const company = searchParams.get('company') || 'Find your dream job'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(to bottom right, #FDF2F8, #F5F3FF)',
                        padding: '40px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            textAlign: 'center',
                            backgroundImage: 'linear-gradient(to right, #EC4899, #8B5CF6, #3B82F6)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: 40,
                            fontWeight: 'normal',
                            color: '#6B7280',
                            textAlign: 'center',
                            marginBottom: '40px',
                            maxWidth: '80%',
                        }}
                    >
                        {company}
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            color: '#4B5563',
                            marginTop: '20px',
                            textAlign: 'center',
                        }}
                    >
                        coolestjob.gr 🚀
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        )
    } catch (e) {
        return new Response(`Failed to generate image`, {
            status: 500,
        })
    }
}
