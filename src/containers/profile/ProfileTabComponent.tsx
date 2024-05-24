import React, { useEffect, useState } from 'react'
import * as styles from './index.css'
import { BsFillPinAngleFill, BsYoutube, BsInstagram } from "react-icons/bs"
import useProfileStore from '@/store/ProfileStore'
import { FiLink } from "react-icons/fi"
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'
import useStreamingStore from '@/store/StreamingStore'

interface SocialLinkProps {
  title: string
  url: string
}

interface VideoProps {
  videoThumbnail: string
  title: string
  viewCount: number
  day: number
  isFixed: boolean
  videoSerial: number
}

interface VideoData {
  createdAt: string
  isFixed: boolean
  thumbnail: string
  title: string
  videoId: number
  videoLength: number
  videoPlay: number
  videoSerial: number
}

const SocialLink: React.FC<SocialLinkProps> = ({ url }) => {
  const renderIcon = () => {
    if (url.toLowerCase().includes('www.instagram.com')) {
      return <BsInstagram size={16} />
    } else if (url.toLowerCase().includes('www.youtube.com')) {
      return <BsYoutube size={16} />
    }
    return <FiLink size={16} />
  }

  const platformName = () => {
    if (url.toLowerCase().includes('www.instagram.com')) {
      return '인스타그램'
    } else if (url.toLowerCase().includes('www.youtube.com')) {
      return '유튜브'
    }
    return '기타'
  }

  return (
    <div className={styles.socialLinkBox}>
      {renderIcon()}
      <span className={styles.socialLinkItemTitle}>{platformName()}:</span>
      <a href={url}>
        <span>{url}</span>
      </a>
    </div>
  )
}

export default function ProfileTabComponent() {
  const { profileData, profileUserName } = useProfileStore()
  const [links, setLinks] = useState(profileData.links || [])
  const [loading, setLoading] = useState(false)
  const [representativeVideoInfo, setRepresentativeVideoInfo] = useState<VideoProps[]>([])
  const { setRecordedVideoTitle } = useStreamingStore()
  const router = useRouter()

  const goRepresentativeVideo = (videoSerial: number, username: string, videoTitle: string) => {
    // console.log(videoSerial, username)
    router.push(`/streaming/${btoa(username)}/${videoSerial}`)
    setRecordedVideoTitle(videoTitle)
  }

  useEffect(() => {
    if (profileData) {
      setLoading(true)
      const fixedVideos = (profileData.videos || [])
        .filter((video: VideoProps) => video.isFixed)
        .map((video: VideoData) => ({
          videoThumbnail: video.thumbnail,
          title: video.title,
          viewCount: video.videoPlay,
          day: Math.ceil((new Date().getTime() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
          videoSerial: video.videoSerial
        }))
      setRepresentativeVideoInfo(fixedVideos)
    }
    // console.log(profileData, '------------------------gsggdgsg')
  }, [profileData])

  if (loading) {
  return (
    <div>
      <Card>
        <div className={styles.profileTabItemTitleBox}>
          <BsFillPinAngleFill size={16} />
          <span className={styles.profileTabItemTitle}>소셜링크</span>
        </div>
        {links.map((link: SocialLinkProps) => (
          <SocialLink key={link.title} {...link} />
        ))}
      </Card>

      <Card>
        <div className={styles.profileTabItemTitleBox}>
          <BsFillPinAngleFill size={16} />
          <span className={styles.profileTabItemTitle}>대표영상</span>
        </div>
        {representativeVideoInfo.map(video => (
            <div key={video.title} className={styles.representativeVideoInfo}>
              <img src={video.videoThumbnail} className={styles.representativevideoThumnail} 
              onClick={() => goRepresentativeVideo(video.videoSerial, profileUserName, video.title)} />
              <div className={styles.representativevideoInfoBox}>
                <span>{video.title}</span>
                <span className={styles.videoInfoText}>조회수 {video.viewCount}회 · {video.day}일 전</span>
              </div>
            </div>
          ))}
      </Card>
    </div>
  )
}
}
