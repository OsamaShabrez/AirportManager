<?php
namespace App\Controller;

class AirportsController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {
        $airports = $this->Airports->find('all', ['contain' => ['Countries']]);
        $this->set([
            'airports' => $airports,
            '_serialize' => ['airports']
        ]);
    }

    public function view($id)
    {
        $airport = $this->Airports->get($id, ['contain' => ['Countries']]);
        $this->set([
            'airport' => $airport,
            '_serialize' => ['airport']
        ]);
    }

    public function add()
    {
        $airport = $this->Airports->newEntity($this->request->getData());
        if ($this->Airports->save($airport)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            'airport' => $airport,
            '_serialize' => ['message', 'airport']
        ]);
    }

    public function edit($id)
    {
        $airport = $this->Airports->get($id);
        if ($this->request->is(['post', 'put'])) {
            $airport = $this->Airports->patchEntity($airport, $this->request->getData());
            if ($this->Airports->save($airport)) {
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
        $airport = $this->Airports->get($id);
        $message = 'Deleted';
        if (!$this->Airports->delete($airport)) {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}
