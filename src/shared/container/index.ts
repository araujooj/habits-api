import { container } from 'tsyringe'

import '@modules/users/providers/index'
import './providers'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository'
import IStudentsRepository from '@modules/students/repositories/IStudentRepository'

import PerceptionsRepository from '@modules/perceptions/infra/typeorm/repositories/PerceptionsRepository'
import IPerceptionsRepository from '@modules/perceptions/repositories/IPerceptionRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

container.registerSingleton<IStudentsRepository>('StudentsRepository', StudentsRepository)

container.registerSingleton<IPerceptionsRepository>('PerceptionsRepository', PerceptionsRepository)
