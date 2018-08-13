<?php
namespace App\Controller;

use Cake\ORM\Exception\PersistenceFailedException;

class FlightSchedulesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {
        $flightSchedules = $this->FlightSchedules->find('all', ['contain' => ['Airlines', 'DepartAirport' => ['Countries'], 'ArriveAirport' => ['Countries']]]);
        $this->set([
            'flightSchedules' => $flightSchedules,
            '_serialize' => ['flightSchedules']
        ]);
    }

    public function view($airline_id, $depart_airport_id, $arrive_airport_id)
    {
        $flightSchedule = $this->FlightSchedules->get([$airline_id, $depart_airport_id, $arrive_airport_id],
          ['contain' => ['Airlines', 'DepartAirport' => ['Countries'], 'ArriveAirport' => ['Countries']]]);
        $this->set([
            'flightSchedule' => $flightSchedule,
            '_serialize' => ['flightSchedule']
        ]);
    }

    public function add()
    {
        $data = $this->request->getData();
        $flightSchedule = $this->FlightSchedules->newEntity();
        $flightSchedule->airline_id = $data['airline_id'];
        $flightSchedule->depart_airport_id = $data['depart_airport_id'];
        $flightSchedule->arrive_airport_id = $data['arrive_airport_id'];
        if ($this->FlightSchedules->save($flightSchedule)) {
            $message = 'Saved';
            $flightSchedule = $this->FlightSchedules->get([$flightSchedule->airline_id, $flightSchedule->depart_airport_id, $flightSchedule->arrive_airport_id],
              ['contain' => ['Airlines', 'DepartAirport' => ['Countries'], 'ArriveAirport' => ['Countries']]]);
        } else {
            throw new PersistenceFailedException($flightSchedule, $flightSchedule->Errors());
        }
        $this->set([
            'message' => $message,
            'flightSchedule' => $flightSchedule,
            '_serialize' => ['message', 'flightSchedule']
        ]);
    }

    public function edit($air_id, $depart_id, $arrive_id)
    {
        $flightSchedule = $this->FlightSchedules->get([$air_id, $depart_id, $arrive_id]);
        if ($this->request->is(['post', 'put'])) {
            $this->FlightSchedules->delete($flightSchedule);
            $flightSchedule = $this->FlightSchedules->newEntity();
            $data = $this->request->getData();
            $flightSchedule->airline_id = $data['airline_id'];
            $flightSchedule->depart_airport_id = $data['depart_airport_id'];
            $flightSchedule->arrive_airport_id = $data['arrive_airport_id'];
            if ($this->FlightSchedules->save($flightSchedule)) {
                $message = 'Saved';
                $flightSchedule = $this->FlightSchedules->get([$flightSchedule->airline_id, $flightSchedule->depart_airport_id, $flightSchedule->arrive_airport_id],
                  ['contain' => ['Airlines', 'DepartAirport' => ['Countries'], 'ArriveAirport' => ['Countries']]]);
            } else {
                throw new PersistenceFailedException($flightSchedule, $flightSchedule->Errors());
            }
        }
        $this->set([
            'message' => $message,
            'flightSchedule' => $flightSchedule,
            '_serialize' => ['message', 'flightSchedule']
        ]);
    }

    public function delete($airline_id, $depart_airport_id, $arrive_airport_id)
    {
        $flightSchedule = $this->FlightSchedules->get([$airline_id, $depart_airport_id, $arrive_airport_id]);
        $message = 'Deleted';
        if (!$this->FlightSchedules->delete($flightSchedule)) {
            throw new PersistenceFailedException($flightSchedule, $flightSchedule->Errors());
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}
