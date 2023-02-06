import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { CourseFindAllQueryHandler } from '../application/queries/course-find-all.query';
import { CourseInfrastructure } from '../infrastructure/course.infrastructure';
import { CourseController } from './course.controller';

const mockCourseInserted = {
  id: {
    value: '02c2671f-02cc-4d2f-96ea-8364122f1132',
  },
  name: 'Angular 17 Pro',
  goals: [
    {
      id: {
        value: '350ed5ff-ffba-43db-8608-2063b03aa5ea',
      },
      description: 'Aprender a desarrollar Angular de forma PRO',
      active: true,
    },
    {
      id: {
        value: '66c3746c-a996-43f9-a8c3-14f162b955a4',
      },
      description: 'Crear apps empresariales',
      active: true,
    },
    {
      id: {
        value: '9e43a64b-026e-4df9-a0b3-2eaecf28807b',
      },
      description: 'Crear con buenas prácticas',
      active: true,
    },
  ],
  active: true,
  createdAt: '2023-02-05T21:28:24.127Z',
};

describe('CourseController', () => {
  let courseController: CourseController;
  let courseFindAllQueryHandler: CourseFindAllQueryHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CommandBus,
        QueryBus,
        CourseFindAllQueryHandler,
        CourseInfrastructure,
      ],
    }).compile();

    courseController = module.get<CourseController>(CourseController);
    courseFindAllQueryHandler = module.get<CourseFindAllQueryHandler>(
      CourseFindAllQueryHandler,
    );
  });

  it('findAll', async () => {
    //
    courseFindAllQueryHandler.execute = jest
      .fn()
      .mockResolvedValue(mockCourseInserted);

    // Act
    const result = await courseController.findAll();

    // Assert
    expect(result).toEqual(mockCourseInserted);
  });
});
