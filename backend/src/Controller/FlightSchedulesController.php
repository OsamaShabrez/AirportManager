<?php
namespace App\Controller;

class FlightSchedulesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {
        $flightSchedules = $this->FlightSchedules->find('all');
        $this->set([
            'flightSchedules' => $flightSchedules,
            '_serialize' => ['flightSchedules']
        ]);
    }

    public function view($id)
    {
        $flightSchedule = $this->FlightSchedules->get($id);
        $this->set([
            'flightSchedule' => $flightSchedule,
            '_serialize' => ['flightSchedule']
        ]);
    }

    public function add()
    {
        $flightSchedule = $this->FlightSchedules->newEntity($this->request->getData());
        if ($this->FlightSchedules->save($flightSchedule)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            'flightSchedule' => $flightSchedule,
            '_serialize' => ['message', 'flightSchedule']
        ]);
    }

    public function edit($id)
    {
        $flightSchedule = $this->FlightSchedules->get($id);
        if ($this->request->is(['post', 'put'])) {
            $flightSchedule = $this->FlightSchedules->patchEntity($flightSchedule, $this->request->getData());
            if ($this->FlightSchedules->save($flightSchedule)) {
                $message = 'Saved';
            } else {
                $message = 'Error';
            }
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }

    public function delete($id)
    {
        $flightSchedule = $this->FlightSchedules->get($id);
        $message = 'Deleted';
        if (!$this->FlightSchedules->delete($flightSchedule)) {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}
