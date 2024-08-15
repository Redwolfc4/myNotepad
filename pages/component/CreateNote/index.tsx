import { useDisclosure,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter, Input, Textarea, Heading} from "@chakra-ui/react"
import {useState } from "react";
const CreateNote = ()=> {
  // deklarasi
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/addCatatan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        const note = await res.json();
        alert(`addNote created! title = ${note.title} Content = ${note.content}`);
        window.location.reload()
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Terjadi Kesalahan ${error}`);
    }
  }
  return (
    <>
      <Button pos={'fixed'} bottom={50} right={10} width={"max-content"} colorScheme={'purple'} variant={'outline'} onClick={onOpen} _hover={{bg:'purple.400', color:'white', transition:'all .2s ease-in-out'}}>+</Button>
      <Modal
      size={'6xl'}
      isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent marginInline={'2rem'}>
          <ModalHeader >
            <Heading as={'h2'} size={'lg'} pb={'1rem'}>Tambah Data</Heading>
            <Input onChange={(e)=>setTitle(e.currentTarget.value)} name="title" placeholder='Masukkan judul notepad anda' _focusVisible={'outline:none'} width={'90%'} size={'md'}/></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Textarea onChange={(e) => setContent(e.currentTarget.value)} placeholder="Isikan Data Catatan" colorScheme={'red'} variant={'outline'} _focusVisible={'outline:none'} size={'md'} height={'345px'}>
              </Textarea>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' variant={'outline'} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} colorScheme={'blue'} variant={'outline'}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateNote