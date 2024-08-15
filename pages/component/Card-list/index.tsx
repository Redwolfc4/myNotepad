import { DeleteIcon } from "@chakra-ui/icons";
import { Box, 
  Button, 
  Heading, 
  Icon, 
  Stack,
  Text } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useRef } from "react";


/* The `interface MyComponentProps` in the TypeScript React code snippet defines the props that the
`Card` component expects to receive. It specifies the shape of the props object that will be passed
to the `Card` component when it is used elsewhere in the application. */
interface MyComponentProps {
  id: number;
  title: string;
  description: string;
  createdAt:string;
}


/**
 * The Card component in TypeScript React handles displaying a card with title, description, and
 * creation date, along with a delete button functionality.
 * @param  - The `Card` component is a React functional component that displays a card with a title,
 * description, and creation date. It also includes a delete button that triggers a delete operation
 * when clicked.
 * @returns The `Card` component is being returned. It is a React functional component that renders a
 * box containing a title, description, creation date, and a delete button. The component also includes
 * functionality to handle the deletion of the card item when the delete button is clicked.
 * Additionally, it uses the `useDisclosure` hook to manage the visibility of a `Detail` component that
 * displays more information when the card
 */
const Card:React.FC<MyComponentProps> = ({id,title = '',description = '', createdAt= ''})=>{
  const Key = useRef('');
  const router = useRouter();
  // const [message, setMessage] = useState('');

  /**
   * The function `handleDelete` is an asynchronous function that sends a DELETE request to a specified
   * API endpoint to delete data by key, handling the response accordingly.
   */
  const handleDelete = async () => {

    try {
      const response = await fetch('/api/hapusCatatan', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Key),
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghapus data');
    }
    window.location.reload()
  };

  const buttonDelete = (e)=>{
    Key.current = e.currentTarget.id
    return handleDelete()
  }

  const goToDetail = (e) => {
    Key.current = e.currentTarget.parentNode.id
    router.push(`/modal_detail/${parseInt(Key.current)}`);
  };


  return ( 
    <>
    <Box
      key={id}
      id={id.toString()}
      display={"flex"}
      w={"100%"}
      maxW={"100vw"}
      gap={"1rem"}
      justifyContent={"space-between"}
      alignItems={'center'}
      boxShadow={'-6px 8px 11px -3px rgba(122,118,118,0.86)'}
      p={'2rem'}
      borderRadius={'20px'}
      borderTop={'1.5px solid rgba(122,118,118,0.86)'}
      borderRight={'1.5px solid rgba(122,118,118,0.86)'}
      cursor={"pointer"}
    >
      <Stack id="noted" w={"100%"} spacing={'.5rem'} onClick={goToDetail} overflow={'hidden'}>
        {/* heading */}
        <Heading as={"h3"} noOfLines={1} size="xs" textTransform="capitalize" textOverflow={'ellipsis'}>
          {title}
        </Heading>
        {/* content */}
        <Text as={"pre"} noOfLines={1} pt="2" fontSize="sm" textOverflow={'ellipsis'}>
          {description}
        </Text>
        <Text as={"p"} pt="2" fontSize="sm">
          {createdAt}
        </Text>
      </Stack>
      {/* button */}
      <Box id="button">
        <Button id={id.toString()} onClick={buttonDelete} variant={"outline"} colorScheme={"red"}>
          <Icon as={DeleteIcon} fontSize={"lg"} />
        </Button>
      </Box>
    {/* <Detail id={id.toString()} isOpen={isOpen} onClose={onClose} title={title} description={description}/> */}
    </Box>
    </>
  );
};

export default Card;
