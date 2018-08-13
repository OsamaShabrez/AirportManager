<?php
namespace App\Controller;

class AirlinesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {
        $airlines = $this->Airlines->find('all', ['contain' => ['Countries']]);
        $this->set([
            'airlines' => $airlines,
            '_serialize' => ['airlines']
        ]);
    }

    public function view($id)
    {
        $airline = $this->Airlines->get($id, ['contain' => ['Countries']]);
        $this->set([
            'airline' => $airline,
            '_serialize' => ['airline']
        ]);
    }

    public function add()
    {
        $airline = $this->Airlines->newEntity($this->request->getData());
        if ($this->Airlines->save($airline)) {
            $message = 'Saved';
            $airline = $this->Airlines->get($airline->id, ['contain' => ['Countries']]);
        } else {
            $message = $airline->getErrors();
        }
        $this->set([
            'message' => $message,
            'airline' => $airline,
            '_serialize' => ['message', 'airline']
        ]);
    }

    public function edit($id)
    {
        $airline = $this->Airlines->get($id);
        if ($this->request->is(['post', 'put'])) {
            $airline = $this->Airlines->patchEntity($airline, $this->request->getData());
            if ($this->Airlines->save($airline)) {
                $message = 'Saved';
                $airline = $this->Airlines->get($airline->id, ['contain' => ['Countries']]);
            } else {
                $message = $airline->getErrors();
            }
        }
        $this->set([
            'message' => $message,
            'airline' => $airline,
            '_serialize' => ['message', 'airline']
        ]);
    }

    public function delete($id)
    {
        $airline = $this->Airlines->get($id);
        $message = 'Deleted';
        if (!$this->Airlines->delete($airline)) {
            $message = $airline->getErrors();
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}
