// import
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,Textarea,useDisclosure,
    Heading
  } from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Database from '@/utils/db';;


const Detail = ({note})=>{
  // const {id,isOpen,onClose,title,description}= data
  note = note[0]
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [titless, setTitle] = useState(note.title);
  const [contents, setContent] = useState(note.content);
  const router = useRouter()
  const Key = useRef('')

  
  const handleClose = ()=>{
    
    setTitle('')
    setContent('')
    Key.current=''
    onClose()
    router.push('/')
  }

  useEffect(() => {
    onOpen();
  }, [onOpen]);
  
  const handleEdit = async (e) => {
    e.preventDefault();
    Key.current = e.currentTarget.id
    
    try {
      const res = await fetch('/api/editCatatan', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titless, contents, Key }),
      });

      if (res.ok) {
        alert(`note updated!`);
        router.push('/')
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update post');
    }
  };
  

  return (
      <>
        <Modal
        size={'6xl'}
          isCentered
          key={note.id}
          onClose={handleClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent marginInline={'2rem'}>
            <ModalHeader>
              <Heading as={'h2'} size={'lg'} pb={'1rem'}>Detail</Heading>
              <Input id='judul' value={titless} onChange={(e)=>setTitle(e.currentTarget.value)} placeholder='Isikan judul notepad anda' _focusVisible={'outline:none'} width={'90%'} size={'md'}/></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea id='deskripsi' value={contents} onChange={(e) => setContent(e.currentTarget.value)} placeholder="Isikan Data Catatan" variant={'outline'} _focusVisible={'outline:none'} size={'md'} height={'345px'}>
              </Textarea>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' variant={'outline'} mr={3} onClick={handleClose}>
                Close
              </Button>
              <Button id={`${note.id}`} onClick={(titless!=note.title || note.content !=contents)? handleEdit:(e)=>e.preventDefault} colorScheme={(titless==note.title && contents==note.content)?'gray':'blue'} variant={(titless==note.title && note.content ==contents)? 'ghost':'outline'}>Edit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  )
}

export default Detail

export async function getServerSideProps(data) {
  const { index } = data.params;
  const note = await Database.note.findMany({
    where: { id:parseInt(index) },
    select: {id:true,title:true,content:true},
    take: 1
  });

  if (!note) {
    return {
      notFound: true,
    };
  }

  return {
    props: {note}, // Mengirim data catatan ke komponen
  };
}

// edit judul dan isi note itu akan membesar width auto ke bawah overflow hidden dan wrap
// cardlist overflow hidden seuai width tetap kalo lebih dia akan ...