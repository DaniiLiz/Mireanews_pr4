interface EventImage {
  src: string;
  width: number;
  height: number;
}

interface EventAttachmentPhoto {
  type: 'PHOTO',
  image: EventImage
}

interface EventAttachmentLink {
  type: 'LINK',
  image: EventImage,
  link: string,
  caption: string;
  titleLink: string;
  description: string;
}

type EventAttachment = EventAttachmentPhoto | EventAttachmentLink;

export interface EventInfo {
  id: number;
  text: string;
  date: number;
  type: string;
  attachments: EventAttachment[]
}