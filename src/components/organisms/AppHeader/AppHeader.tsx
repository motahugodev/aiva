import * as React from 'react';
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  List,
  Avatar,
  Menu,
  Tooltip,
  Button,
} from '@material-tailwind/react';
import {
  LogOut,
  Menu as MenuIcon,
  MultiplePages,
  NavArrowDown,
  Settings,
  UserCircle,
  Xmark,
} from 'iconoir-react';
import { Link } from 'react-router';
import type { Category, User } from '@/types';
import { removerRefreshToken, removerToken } from '@/utils/cookies';
import { useNavigate } from 'react-router';

function ProfileMenu({ avatar, name }) {
  const navigate = useNavigate();

  const onLogout = () => {
    removerRefreshToken();
    removerToken();
    navigate('/auth/login');
  };

  return (
    <Menu>
      <Menu.Trigger
        as={Avatar}
        src={avatar}
        alt='profile-picture'
        size='sm'
        className='border border-primary p-0.5 lg:ml-auto'
      />
      <Menu.Content>
        <Menu.Item>
          <UserCircle className='mr-2 h-[18px] w-[18px]' /> {name}
        </Menu.Item>
        <Menu.Item as={Link} to='/product/list'>
          <Settings className='mr-2 h-[18px] w-[18px]' /> Meus Produtos
        </Menu.Item>
        <hr className='!my-1 -mx-1 border-secondary-dark' />
        <Menu.Item
          onClick={() => onLogout()}
          className='text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error dark:hover:text-error dark:focus:text-error'
        >
          <LogOut className='mr-2 h-[18px] w-[18px]' />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

const MenuItem = React.forwardRef<
  typeof Menu.Item,
  {
    title: string;
    description?: string;
    image?: string;
    id: number;
  }
>(({ title, description, image, id, ...rest }, ref) => {
  return (
    <Link to={`/categories/${id}`}>
      <List.Item ref={ref} className='p-1.5' {...rest}>
        <List.ItemStart>
          <div className='flex items-center justify-center rounded-[5px] bg-surface-light p-2'>
            <img crossorigin='anonymous' className='h-6 w-6 object-cover' src={image} />
          </div>
        </List.ItemStart>
        <div className='leading-none'>
          <Typography color='default' className='mb-0.5 text-sm font-semibold'>
            {title}
          </Typography>
          <Typography type='small' className='text-xs text-foreground'>
            {description}
          </Typography>
        </div>
      </List.Item>
    </Link>
  );
});

interface Prop {
  categories: Category[];
  profile: User;
}

export default function NavbarWithMegaMenu({ categories = [], profile }: Prop) {
  const [openNav, setOpenNav] = React.useState(false);

  const renderItems = categories.map(({ image, name, id }, key) => (
    <MenuItem key={key} title={name} image={image} id={id} />
  ));

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <Navbar className='mx-auto w-full max-w-screen-xl'>
      <div className='flex items-center'>
        <Typography as='a' href='/' type='small' className='ml-2 mr-2 block py-1 font-semibold'>
          Aiva
        </Typography>
        <hr className='mx-1 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block' />
        <div className='hidden lg:block'>
          <List className='mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center'>
            <Tooltip placement='bottom' interactive>
              <Tooltip.Trigger>
                <List.Item>
                  <List.ItemStart className='me-1.5'>
                    <MultiplePages className='h-4 w-4' />
                  </List.ItemStart>
                  <Typography type='small'>Categorias</Typography>
                  <List.ItemEnd className='ps-1'>
                    <NavArrowDown className='h-3.5 w-3.5 group-data-[open=true]:rotate-180' />
                  </List.ItemEnd>
                </List.Item>
              </Tooltip.Trigger>
              <Tooltip.Content className='z-[100000] grid max-w-screen-xl rounded-lg border border-surface bg-background p-2 shadow-xl shadow-surface/10 dark:border-surface dark:bg-background'>
                <ul className='grid grid-cols-3 gap-y-2'>{renderItems}</ul>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
            {/* <NavList /> */}
          </List>
        </div>
        <IconButton
          size='sm'
          variant='ghost'
          color='secondary'
          onClick={() => setOpenNav(!openNav)}
          className='ml-auto mr-2 grid lg:hidden'
        >
          {openNav ? <Xmark className='h-4 w-4' /> : <MenuIcon className='h-4 w-4' />}
        </IconButton>
        {Object.keys(profile).length > 0 ? (
          <ProfileMenu avatar={profile.avatar} name={profile.name} />
        ) : (
          <Button as={Link} to='auth/login'>
            Login
          </Button>
        )}
      </div>
      <Collapse open={openNav}>
        <ul className='grid grid-cols-1 gap-y-2 md:grid-cols-2'>{renderItems}</ul>
        {/* <NavList /> */}
      </Collapse>
    </Navbar>
  );
}
