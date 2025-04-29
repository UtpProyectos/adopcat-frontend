import { CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext'
import { Chip, Tooltip } from "@heroui/react";
import { Link } from 'react-router-dom';

const Profile = () => {

  const { user, logout } = useAuth()

  return (
    <div className='pt-28 container mx-auto'>

      <div className='flex items-center justify-center gap-4'>
        <img
          src={
            user?.profilePhoto
              ? user.profilePhoto
              : `https://ui-avatars.com/api/?name=${user?.firstName || ''}+${user?.lastName || ''}&background=0D8ABC&color=fff`
          }
          alt="Perfil"
          className="w-40 h-40 rounded-full object-cover cursor-pointer"
        />
        <div className='flex items-center gap-4'>
          <div className="flex items-center gap-2">
            <h1 className='text-3xl font-bold'>
              {user?.firstName || ''} {user?.lastName || ''}
            </h1>

            {/* Verificación */}
            {user?.verified ? (
              <Tooltip content="Usuario verificado">
                <CheckCircle size={24} className="text-blue-500 cursor-pointer" />
              </Tooltip>
            ) : (
              <Tooltip content="Usuario no verificado">
                <XCircle size={24} className="text-gray-400 cursor-pointer" />
              </Tooltip>
            )}
          </div>

          {/* Plan */}
          <Link to='/planes'>
            <Chip color="success" className='text-body'>
              Free
            </Chip>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Profile
