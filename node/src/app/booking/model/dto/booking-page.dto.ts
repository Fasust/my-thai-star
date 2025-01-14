import { classToPlain, plainToClass } from 'class-transformer';
import { Page } from '../../../shared/model/dto/page.dto';
import { Pageable } from '../../../shared/model/dto/pageable.dto';
import { Booking } from '../entities/booking.entity';
import { BookingCTO } from './bookingCTO.dto';

// This transformation is a strange thing that we need to do in order to be compatible
// with the java backend
export class BookingPage extends Page<BookingCTO> {
  static fromBookings(
    totalElements: number,
    pageable: Pageable,
    bookings: Booking[],
  ) {
    return plainToClass(BookingPage, {
      totalElements,
      pageable,
      content: bookings.map(booking => {
        return {
          booking:
            booking && classToPlain(booking, { excludeExtraneousValues: true }),
          table: booking.table && classToPlain(booking.table),
          invitedGuests:
            booking.invitedGuests && classToPlain(booking.invitedGuests),
          order: booking.order && classToPlain(booking.order),
          orders:
            booking.order &&
            booking.invitedGuests &&
            booking.invitedGuests.map(element => element.order),
          user: booking.user && classToPlain(booking.user),
        };
      }),
    });
  }
}
